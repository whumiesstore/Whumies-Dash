import { useState } from "react";

function SkuWiseFilters({
  skuQuery,
  settlementFilter,
  onSkuQueryChange,
  onSettlementFilterChange,
  onDownloadCsv,
}) {
  const [isSettlementFocused, setIsSettlementFocused] = useState(false);

  return (
    <div className="sku-wise-filters">
      <label className="sku-filter-field sku-search-field">
        <span>SKU Search</span>
        <input
          type="text"
          value={skuQuery}
          placeholder="All"
          onChange={(e) => onSkuQueryChange(e.target.value)}
        />
      </label>

      <label
        className={`sku-filter-field sku-settlement-floating-field ${settlementFilter || isSettlementFocused ? "has-value" : ""}`}
      >
        <span>Settlement &le;</span>
        <input
          type="number"
          inputMode="decimal"
          value={settlementFilter}
          placeholder={
            settlementFilter || isSettlementFocused ? "" : "Settlement ≤"
          }
          onFocus={() => setIsSettlementFocused(true)}
          onBlur={() => setIsSettlementFocused(false)}
          onChange={(e) =>
            onSettlementFilterChange(e.target.value.replace(/[^\d.]/g, ""))
          }
        />
      </label>

      <button
        type="button"
        className="sku-download-btn"
        onClick={onDownloadCsv}
      >
        ⬇ Download CSV
      </button>
    </div>
  );
}

export default SkuWiseFilters;
