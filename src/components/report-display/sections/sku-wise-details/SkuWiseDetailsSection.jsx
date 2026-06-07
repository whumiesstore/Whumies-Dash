import { useMemo, useState } from "react";
import reportData from "../../../../data/ReportData.json";
import { formatCurrency } from "../../../../utils/formatters";
import SkuWiseHeader from "./SkuWiseHeader";
import SkuWiseTabs from "./SkuWiseTabs";
import SkuWiseFilters from "./SkuWiseFilters";
import SkuWiseTable from "./SkuWiseTable";
import "./skuWiseDetails.css";

const baseTabs = [
  { key: "all", label: "ALL" },
  { key: "highProfit", label: "HIGH PROFIT" },
  { key: "mediumProfit", label: "MEDIUM PROFIT" },
  { key: "lowProfit", label: "LOW PROFIT" },
  { key: "lossMaking", label: "LOSS MAKING" },
];

function SkuWiseDetailsSection() {
  const data = reportData.skuWiseDetails;

  const [activeTab, setActiveTab] = useState("all");
  const [searchValue, setSearchValue] = useState("all");
  const [maxSettlement, setMaxSettlement] = useState("");

  const products = data.products || [];

  const tabsWithCounts = useMemo(() => {
    return baseTabs.map((tab) => {
      if (tab.key === "all") {
        return {
          ...tab,
          count: products.length,
        };
      }

      return {
        ...tab,
        count: products.filter((item) => item.profitType === tab.key).length,
      };
    });
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesTab = activeTab === "all" || item.profitType === activeTab;

      const query = searchValue.trim().toLowerCase();

      const matchesSearch =
        query === "" ||
        query === "all" ||
        item.productName.toLowerCase().includes(query) ||
        item.sku.toLowerCase().includes(query) ||
        item.asin.toLowerCase().includes(query);

      const maxSettlementValue = Number(maxSettlement || 0);

      const matchesSettlement =
        !maxSettlementValue || Number(item.settlement || 0) <= maxSettlementValue;

      return matchesTab && matchesSearch && matchesSettlement;
    });
  }, [products, activeTab, searchValue, maxSettlement]);

  console.log(filteredProducts)

  const handleDownloadCsv = () => {
    console.log("Download CSV later");
  };

  const handleViewSku = (product) => {
    console.log("View SKU later", product);
  };

  return (
    <section className="sku-wise-section">
      <div className="sku-wise-divider" />

      <SkuWiseHeader
        title={data.title}
        subtitle={data.subtitle}
        totalProfit={formatCurrency(data.totalProfit)}
      />

      <SkuWiseTabs
        tabs={tabsWithCounts}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <SkuWiseFilters
        searchValue={searchValue}
        maxSettlement={maxSettlement}
        onSearchChange={setSearchValue}
        onMaxSettlementChange={setMaxSettlement}
        onDownloadCsv={handleDownloadCsv}
      />

      <SkuWiseTable products={filteredProducts} onViewSku={handleViewSku} />
    </section>
  );
}

export default SkuWiseDetailsSection;