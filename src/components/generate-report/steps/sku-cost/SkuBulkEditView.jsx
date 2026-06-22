import { useMemo, useState } from "react";
import {
  getCostTotal,
  sanitizeNumberInput,
  validateCostRow,
} from "../../../../utils/costValidation";

function SkuBulkEditView({
  skus,
  costData,
  selectedSkus,
  setSelectedSkus,
  onApply,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [bulkMessage, setBulkMessage] = useState("");

  const [bulkValues, setBulkValues] = useState({
    productCost: "",
    productGst: "",
    packingCost: "",
    packingGst: "",
    otherCost: "",
  });

  const filteredSkus = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return skus;

    return skus.filter((item) => {
      return (
        item.productName.toLowerCase().includes(query) ||
        item.sku.toLowerCase().includes(query)
      );
    });
  }, [skus, searchTerm]);

  const selectedCount = selectedSkus.length;

  const allVisibleSelected =
    filteredSkus.length > 0 &&
    filteredSkus.every((item) => selectedSkus.includes(item.sku));

  const bulkErrors = validateCostRow(bulkValues);

  const hasAnyBulkValue = Object.values(bulkValues).some(
    (value) => String(value).trim() !== "",
  );

  const hasBulkErrors = Object.keys(bulkErrors).length > 0;

  const canApply = selectedCount > 0 && hasAnyBulkValue && !hasBulkErrors;

  const toggleSku = (sku) => {
    setSelectedSkus((prev) =>
      prev.includes(sku) ? prev.filter((item) => item !== sku) : [...prev, sku],
    );

    setBulkMessage("");
  };

  const toggleSelectAllVisible = () => {
    if (filteredSkus.length === 0) return;

    if (allVisibleSelected) {
      const visibleSkuSet = new Set(filteredSkus.map((item) => item.sku));

      setSelectedSkus((prev) => prev.filter((sku) => !visibleSkuSet.has(sku)));
    } else {
      setSelectedSkus((prev) => {
        const next = new Set(prev);
        filteredSkus.forEach((item) => next.add(item.sku));
        return Array.from(next);
      });
    }

    setBulkMessage("");
  };

  const updateBulkValue = (field, value) => {
    const sanitizedValue = sanitizeNumberInput(value);

    setBulkValues((prev) => ({
      ...prev,
      [field]: sanitizedValue,
    }));

    setBulkMessage("");
  };

  const handleApply = () => {
    if (selectedCount === 0) {
      setBulkMessage("Please select at least one SKU to apply bulk edit.");
      return;
    }

    if (!hasAnyBulkValue) {
      setBulkMessage("Please enter at least one cost value to apply.");
      return;
    }

    if (hasBulkErrors) {
      const firstError = Object.values(bulkErrors)[0];
      setBulkMessage(firstError);
      return;
    }

    const cleanedValues = Object.fromEntries(
      Object.entries(bulkValues).filter(
        ([, value]) => String(value).trim() !== "",
      ),
    );

    onApply(cleanedValues);
  };

  return (
    <>
      <div className="bulk-edit-panel">
        <input
          type="text"
          className="bulk-search-input"
          placeholder="Search Products or SKU"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="bulk-input-row">
          <input
            type="text"
            inputMode="decimal"
            placeholder="Product Cost"
            value={bulkValues.productCost}
            className={bulkErrors.productCost ? "bulk-input-error" : ""}
            title={bulkErrors.productCost || ""}
            onChange={(e) => updateBulkValue("productCost", e.target.value)}
          />

          <input
            type="text"
            inputMode="decimal"
            placeholder="Product GST (%)"
            value={bulkValues.productGst}
            className={bulkErrors.productGst ? "bulk-input-error" : ""}
            title={bulkErrors.productGst || ""}
            onChange={(e) => updateBulkValue("productGst", e.target.value)}
          />

          <input
            type="text"
            inputMode="decimal"
            placeholder="Packing Cost"
            value={bulkValues.packingCost}
            className={bulkErrors.packingCost ? "bulk-input-error" : ""}
            title={bulkErrors.packingCost || ""}
            onChange={(e) => updateBulkValue("packingCost", e.target.value)}
          />

          <input
            type="text"
            inputMode="decimal"
            placeholder="Packing GST (%)"
            value={bulkValues.packingGst}
            className={bulkErrors.packingGst ? "bulk-input-error" : ""}
            title={bulkErrors.packingGst || ""}
            onChange={(e) => updateBulkValue("packingGst", e.target.value)}
          />

          <input
            type="text"
            inputMode="decimal"
            placeholder="Other Cost"
            value={bulkValues.otherCost}
            className={bulkErrors.otherCost ? "bulk-input-error" : ""}
            title={bulkErrors.otherCost || ""}
            onChange={(e) => updateBulkValue("otherCost", e.target.value)}
          />

          <div className="bulk-total-preview">
            Total: <strong>₹{getCostTotal(bulkValues)}</strong>
          </div>

          <span className="bulk-selected-pill">{selectedCount} selected</span>

          <button
            type="button"
            className="bulk-apply-btn"
            disabled={!canApply}
            onClick={handleApply}
          >
            Apply
          </button>
        </div>

        {bulkMessage && (
          <div className="bulk-validation-alert">⚠ {bulkMessage}</div>
        )}

        {hasBulkErrors && !bulkMessage && (
          <div className="bulk-validation-alert">
            ⚠ {Object.values(bulkErrors)[0]}
          </div>
        )}
      </div>

      <div className="bulk-select-row">
        <label>
          <input
            type="checkbox"
            checked={allVisibleSelected}
            disabled={filteredSkus.length === 0}
            onChange={toggleSelectAllVisible}
          />
          <span>Select All</span>
        </label>
      </div>

      <div className="bulk-table-wrap">
        {filteredSkus.length === 0 ? (
          <div className="bulk-empty-state">
            No products found for “{searchTerm}”.
          </div>
        ) : (
          <table className="bulk-edit-table">
            <thead>
              <tr>
                <th></th>
                <th>Product Name</th>
                <th>Current</th>
                <th>New</th>
              </tr>
            </thead>

            <tbody>
              {filteredSkus.map((item) => {
                const isSelected = selectedSkus.includes(item.sku);
                const currentCost = getCostTotal(costData[item.sku] || {});
                const newCost = isSelected
                  ? `₹${getCostTotal(bulkValues)}`
                  : "Select to preview";

                return (
                  <tr key={item.sku} className={isSelected ? "selected" : ""}>
                    <td>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSku(item.sku)}
                      />
                    </td>

                    <td className="bulk-product-cell">
                      <span>{item.productName}</span>
                      <strong>{item.sku}</strong>
                    </td>

                    <td>₹{currentCost}</td>

                    <td
                      className={
                        isSelected ? "bulk-new-cost" : "bulk-preview-muted"
                      }
                    >
                      {newCost}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default SkuBulkEditView;
