function SkuWiseFilters({
  searchValue,
  maxSettlement,
  onSearchChange,
  onMaxSettlementChange,
  onDownloadCsv,
}) {
  return (
    <div className="sku-wise-filters">
      <label className="sku-filter-field sku-search-field">
        <span>SKU Search</span>
        <input
          type="text"
          value={searchValue}
          placeholder="All"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </label>

      <label className="sku-filter-field sku-settlement-field">
        <span>Max Settlement</span>
        <div className="sku-currency-input">
          <b>₹</b>
          <input
            type="text"
            inputMode="decimal"
            value={maxSettlement}
            placeholder=""
            onChange={(e) =>
              onMaxSettlementChange(e.target.value.replace(/[^\d.]/g, ""))
            }
          />

          {maxSettlement && (
            <button
              type="button"
              onClick={() => onMaxSettlementChange("")}
              aria-label="Clear max settlement"
            >
              ×
            </button>
          )}
        </div>
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
