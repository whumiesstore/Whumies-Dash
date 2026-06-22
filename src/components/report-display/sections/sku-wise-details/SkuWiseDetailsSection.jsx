import { useMemo, useState } from "react";
import reportData from "../../../../data/reportDataAmazon.json";
import { downloadCsv } from "../../../../utils/downloadCsv";
import SkuWiseTabs from "./SkuWiseTabs";
import SkuWiseFilters from "./SkuWiseFilters";
import SkuWiseStats from "./SkuWiseStats";
import SkuWiseTable from "./SkuWiseTable";
import SkuWisePagination from "./SkuWisePagination";
import SkuViewModal from "./sku-view-modal/SkuViewModal";
import "./skuWiseDetails.css";

const PAGE_SIZE = 15;

function SkuWiseDetailsSection() {
  const data = reportData.skuWiseDetails;

  const [activeTab, setActiveTab] = useState("all");
  const [skuQuery, setSkuQuery] = useState("all");
  const [settlementFilter, setSettlementFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = data.products || [];

  const tabsWithCounts = useMemo(() => {
    return data.tabs.map((tab) => {
      if (tab.key === "all") {
        return { ...tab, count: products.length };
      }

      return {
        ...tab,
        count: products.filter((item) => item.profitType === tab.key).length,
      };
    });
  }, [data.tabs, products]);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesTab = activeTab === "all" || item.profitType === activeTab;

      const normalizedSkuQuery = skuQuery.trim().toLowerCase();

      const matchesSku =
        !normalizedSkuQuery ||
        normalizedSkuQuery === "all" ||
        item.productName.toLowerCase().includes(normalizedSkuQuery) ||
        item.sku.toLowerCase().includes(normalizedSkuQuery) ||
        item.asin.toLowerCase().includes(normalizedSkuQuery);

      const maxSettlement = Number(settlementFilter || 0);
      const matchesSettlement =
        !maxSettlement || Number(item.settlement || 0) <= maxSettlement;

      return matchesTab && matchesSku && matchesSettlement;
    });
  }, [products, activeTab, skuQuery, settlementFilter]);

  const filteredSummary = useMemo(() => {
    const totalProfit = filteredProducts.reduce((total, product) => {
      return total + Number(product.profit || 0);
    }, 0);

    const totalUnits = filteredProducts.length;

    const totalSettlement = filteredProducts.reduce((total, product) => {
      return total + Number(product.settlement || 0);
    }, 0);

    const averageProfit = totalUnits > 0 ? totalProfit / totalUnits : 0;

    return {
      totalProfit,
      totalUnits,
      totalSettlement,
      averageProfit,
    };
  }, [filteredProducts]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PAGE_SIZE),
  );

  const paginatedProducts = filteredProducts.slice(
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

    const safeTabName = activeTabLabel.toLowerCase().replace(/\s+/g, "-");

    downloadCsv({
      fileName: `sku-wise-details-${safeTabName}.csv`,
      columns: [
        { label: "Product Name", value: "productName" },
        { label: "SKU", value: "sku" },
        { label: "ASIN", value: "asin" },
        { label: "Units", value: "units" },
        { label: "Returns", value: (row) => `${row.returns}%` },
        { label: "Settlement", value: "settlement" },
        { label: "Purchase Cost", value: "purchaseCost" },
        { label: "Profit", value: "profit" },
      ],
      rows: filteredProducts,
    });
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
  };

  return (
    <section className="sku-wise-section">
      <div className="sku-wise-divider" />

      <div className="sku-wise-header">
        <h2>{data.title}</h2>
        <p>{data.subtitle}</p>
      </div>

      <SkuWiseTabs
        tabs={tabsWithCounts}
        activeTab={activeTab}
        onChange={handleTabChange}
      />

      <SkuWiseFilters
        skuQuery={skuQuery}
        settlementFilter={settlementFilter}
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

      <SkuWiseStats summary={filteredSummary} />

      <SkuWiseTable
        products={paginatedProducts}
        onViewSku={handleViewProduct}
      />

      <SkuWisePagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredProducts.length}
        pageSize={PAGE_SIZE}
        onPageChange={setCurrentPage}
      />

      {selectedProduct && (
        <SkuViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}

export default SkuWiseDetailsSection;
