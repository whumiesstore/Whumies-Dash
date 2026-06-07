import { useState } from "react";

function OrderWiseFilters({
  orderQuery,
  skuQuery,
  settlementFilter,
  onOrderQueryChange,
  onSkuQueryChange,
  onSettlementFilterChange,
  onDownloadCsv,
}) {
  const [isSettlementFocused, setIsSettlementFocused] = useState(false);

  return (
    <div className="order-wise-filters">
      <input
        type="text"
        value={orderQuery}
        placeholder="Order ID Search"
        onChange={(e) => onOrderQueryChange(e.target.value)}
        className="order-wise-search"
      />

      <label className="order-wise-field">
        <span>SKU Search</span>
        <input
          type="text"
          value={skuQuery}
          placeholder="All"
          onChange={(e) => onSkuQueryChange(e.target.value)}
        />
      </label>

      <label
        className={`order-wise-floating-field ${
          settlementFilter || isSettlementFocused ? "has-value" : ""
        }`}
      >
        <span>Settlement &lt;</span>

        <input
          type="number"
          inputMode="decimal"
          value={settlementFilter}
          placeholder={
            settlementFilter || isSettlementFocused ? "" : "Settlement <"
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
        className="order-wise-download-btn"
        onClick={onDownloadCsv}
      >
        ⬇ Download CSV
      </button>
    </div>
  );
}

export default OrderWiseFilters;
