import { useMemo } from "react";
import {
  getFirstValidationMessage,
  validateCostRow,
} from "../../../../utils/validators/costValidation";

function getAmazonProductLink(asin) {
  return `https://www.amazon.in/dp/${asin}`;
}

function SkuCostTableView({
  skus,
  selectedMarketplace,
  costData,
  updateCost,
  getTotalCost,
  missingCostCount,
  invalidRowCount,
  currentPage,
  setCurrentPage,
  showOnlyWithoutCost,
  setShowOnlyWithoutCost,
  itemsPerPage,
  canContinue,
  formMessage,
  onContinue,
}) {
  const filteredSkus = useMemo(() => {
    if (!showOnlyWithoutCost) return skus;

    return skus.filter((item) => {
      const row = costData[item.sku];
      return Number(row?.productCost || 0) <= 0;
    });
  }, [skus, costData, showOnlyWithoutCost]);

  const totalPages = Math.max(1, Math.ceil(filteredSkus.length / itemsPerPage));

  const paginatedSkus = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredSkus.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredSkus, currentPage, itemsPerPage]);

  const goToPage = (page) => {
    const safePage = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(safePage);
  };

  const renderNumberInput = (item, field, placeholder = "0") => {
    const row = costData[item.sku] || {};
    const errors = validateCostRow(row);
    const hasError = Boolean(errors[field]);

    return (
      <input
        type="text"
        inputMode="decimal"
        value={row[field] || ""}
        placeholder={placeholder}
        className={hasError ? "sku-input-error" : ""}
        title={errors[field] || ""}
        onChange={(e) => updateCost(item.sku, field, e.target.value)}
        onWheel={(e) => e.currentTarget.blur()}
      />
    );
  };

  return (
    <>
      <div className="sku-cost-toolbar">
        <label className="sku-filter-check">
          <input
            type="checkbox"
            checked={showOnlyWithoutCost}
            onChange={(e) => {
              setShowOnlyWithoutCost(e.target.checked);
              setCurrentPage(1);
            }}
          />
          <span>Show only SKUs without cost</span>
        </label>

        <strong className="sku-warning-text">
          {missingCostCount > 0
            ? `${missingCostCount} SKUs still need a product cost`
            : invalidRowCount > 0
              ? `${invalidRowCount} rows have invalid values`
              : "All SKU costs are complete"}
        </strong>

        <span className="sku-saved-status">● Saved</span>
      </div>

      <div className="sku-table-wrap">
        <table className="sku-cost-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product Cost</th>
              <th>Product GST (%)</th>
              <th>Packing Cost</th>
              <th>Packing GST (%)</th>
              <th>Other Cost</th>
              <th>Total Cost</th>
            </tr>
          </thead>

          <tbody>
            {paginatedSkus.map((item) => {
              const row = costData[item.sku] || {};
              const rowErrors = validateCostRow(row);
              const rowErrorMessage = getFirstValidationMessage(rowErrors);
              const hasRowError = Boolean(rowErrorMessage);

              return (
                <tr
                  key={item.sku}
                  className={hasRowError ? "sku-row-error" : ""}
                >
                  <td className="sku-product-cell">
                    {selectedMarketplace === "amazon" ? (
                      <a
                        href={getAmazonProductLink(item.asin)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.productName}
                      </a>
                    ) : (
                      <span className="sku-product-name-plain">
                        {item.productName}
                      </span>
                    )}

                    <strong>{item.sku}</strong>

                    {hasRowError && (
                      <small className="sku-row-error-text">
                        {rowErrorMessage}
                      </small>
                    )}
                  </td>

                  <td>{renderNumberInput(item, "productCost")}</td>
                  <td>{renderNumberInput(item, "productGst")}</td>
                  <td>{renderNumberInput(item, "packingCost")}</td>
                  <td>{renderNumberInput(item, "packingGst")}</td>
                  <td>{renderNumberInput(item, "otherCost")}</td>

                  <td className="sku-total-cell">{getTotalCost(item.sku)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="sku-pagination-row">
        <p>
          Showing{" "}
          {filteredSkus.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
          -{Math.min(currentPage * itemsPerPage, filteredSkus.length)} of{" "}
          {filteredSkus.length} SKUs
        </p>

        <div className="sku-pagination">
          <button
            type="button"
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
          >
            |&lt;
          </button>

          <button
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1)
            .slice(Math.max(0, currentPage - 3), currentPage + 2)
            .map((page) => (
              <button
                type="button"
                key={page}
                className={page === currentPage ? "active" : ""}
                onClick={() => goToPage(page)}
              >
                {page}
              </button>
            ))}

          <button
            type="button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>

          <button
            type="button"
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            &gt;|
          </button>
        </div>
      </div>

      <div className="sku-cost-footer">
        {formMessage ? (
          <div className="sku-cost-alert">⚠ {formMessage}</div>
        ) : missingCostCount > 0 ? (
          <div className="sku-cost-alert">
            ⚠ {missingCostCount} SKUs still need a product cost. Please enter
            all product costs to generate the report.
          </div>
        ) : invalidRowCount > 0 ? (
          <div className="sku-cost-alert">
            ⚠ {invalidRowCount} rows have invalid values.
          </div>
        ) : (
          <div className="sku-cost-success">
            All SKU costs are added. You can continue.
          </div>
        )}

        <button
          type="button"
          className="sku-continue-btn"
          disabled={!canContinue}
          onClick={onContinue}
        >
          Continue
        </button>
      </div>
    </>
  );
}

export default SkuCostTableView;
