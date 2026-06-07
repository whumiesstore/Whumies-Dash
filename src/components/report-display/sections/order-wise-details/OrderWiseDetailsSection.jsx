import { useMemo, useState } from "react";
import reportData from "../../../../data/ReportData.json";
import { downloadCsv } from "../../../../utils/downloadCsv";
import OrderWiseTabs from "./OrderWiseTabs";
import OrderWiseFilters from "./OrderWiseFilters";
import OrderWiseStats from "./OrderWiseStats";
import OrderWiseTable from "./OrderWiseTable";
import OrderWisePagination from "./OrderWisePagination";
import "./orderWiseDetails.css";

const PAGE_SIZE = 15;

function OrderWiseDetailsSection() {
  const data = reportData.orderWiseDetails;

  const [activeTab, setActiveTab] = useState("all");
  const [orderQuery, setOrderQuery] = useState("");
  const [skuQuery, setSkuQuery] = useState("all");
  const [settlementFilter, setSettlementFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const orders = data.orders || [];

  const tabsWithCounts = useMemo(() => {
    return data.tabs.map((tab) => {
      if (tab.key === "all") {
        return { ...tab, count: orders.length };
      }

      return {
        ...tab,
        count: orders.filter((order) => order.status === tab.key).length,
      };
    });
  }, [data.tabs, orders]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesTab = activeTab === "all" || order.status === activeTab;

      const normalizedOrderQuery = orderQuery.trim().toLowerCase();
      const matchesOrder =
        !normalizedOrderQuery ||
        order.orderId.toLowerCase().includes(normalizedOrderQuery);

      const normalizedSkuQuery = skuQuery.trim().toLowerCase();
      const matchesSku =
        !normalizedSkuQuery ||
        normalizedSkuQuery === "all" ||
        order.sku.toLowerCase().includes(normalizedSkuQuery);

      const maxSettlement = Number(settlementFilter || 0);
      const matchesSettlement =
        !maxSettlement || Number(order.settlement || 0) < maxSettlement;

      return matchesTab && matchesOrder && matchesSku && matchesSettlement;
    });
  }, [orders, activeTab, orderQuery, skuQuery, settlementFilter]);

  const filteredSummary = useMemo(() => {
    const totalProfit = filteredOrders.reduce((total, order) => {
      return total + Number(order.profit || 0);
    }, 0);

    const totalUnits = filteredOrders.reduce((total, order) => {
      return total + Number(order.units || 0);
    }, 0);

    const totalSettlement = filteredOrders.reduce((total, order) => {
      return total + Number(order.settlement || 0);
    }, 0);

    const averageProfit = totalUnits > 0 ? totalProfit / totalUnits : 0;

    return {
      totalProfit,
      totalUnits,
      totalSettlement,
      averageProfit,
    };
  }, [filteredOrders]);

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / PAGE_SIZE));

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    setCurrentPage(1);
  };

  const handleDownloadCsv = () => {
    const activeTabLabel =
      tabsWithCounts.find((tab) => tab.key === activeTab)?.label || "ALL";

    downloadCsv({
      fileName: `order-wise-profits-${activeTabLabel.toLowerCase()}.csv`,
      columns: [
        { label: "Order Id", value: "orderId" },
        { label: "SKU", value: "sku" },
        { label: "Units", value: "units" },
        { label: "Status", value: "status" },
        { label: "Settlement", value: "settlement" },
        { label: "Purchase", value: "purchase" },
        { label: "Profit", value: "profit" },
      ],
      rows: filteredOrders,
    });
  };

  const handleViewOrder = (order) => {
    console.log("View order later", order);
  };

  return (
    <section className="order-wise-section">
      <h2>{data.title}</h2>

      <OrderWiseTabs
        tabs={tabsWithCounts}
        activeTab={activeTab}
        onChange={handleTabChange}
      />

      <OrderWiseFilters
        orderQuery={orderQuery}
        skuQuery={skuQuery}
        settlementFilter={settlementFilter}
        onOrderQueryChange={(value) => {
          setOrderQuery(value);
          setCurrentPage(1);
        }}
        onSkuQueryChange={(value) => {
          setSkuQuery(value);
          setCurrentPage(1);
        }}
        onSettlementFilterChange={(value) => {
          setSettlementFilter(value);
          setCurrentPage(1);
        }}
        onDownloadCsv={handleDownloadCsv}
      />

      <OrderWiseStats summary={filteredSummary} />

      <OrderWiseTable orders={paginatedOrders} onViewOrder={handleViewOrder} />

      <OrderWisePagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredOrders.length}
        pageSize={PAGE_SIZE}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}

export default OrderWiseDetailsSection;
