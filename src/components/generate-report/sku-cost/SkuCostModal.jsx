import { useState } from "react";
import SkuCostModalLayout from "./SkuCostModalLayout";
import SkuCostTableView from "./SkuCostTableView";
import SkuBulkEditView from "./SkuBulkEditView";
import {
  getCostTotal,
  hasProductCost,
  hasRowErrors,
  sanitizeNumberInput,
} from "../../../utils/costValidation";

const ITEMS_PER_PAGE = 25;

function SkuCostModal({ skus = [], onClose, onStartAgain }) {
  const [mode, setMode] = useState("cost");
  const [currentPage, setCurrentPage] = useState(1);
  const [showOnlyWithoutCost, setShowOnlyWithoutCost] = useState(false);
  const [costData, setCostData] = useState({});
  const [selectedSkus, setSelectedSkus] = useState([]);
  const [formMessage, setFormMessage] = useState("");

  const missingCostCount = skus.filter((item) => {
    const row = costData[item.sku];
    return !hasProductCost(row);
  }).length;

  const invalidRowCount = skus.filter((item) => {
    const row = costData[item.sku];
    return hasRowErrors(row);
  }).length;

  const updateCost = (sku, field, value) => {
    const sanitizedValue = sanitizeNumberInput(value);

    setCostData((prev) => ({
      ...prev,
      [sku]: {
        ...prev[sku],
        [field]: sanitizedValue,
      },
    }));

    setFormMessage("");
  };

  const getTotalCost = (sku) => {
    return getCostTotal(costData[sku] || {});
  };

  const applyBulkEdit = (bulkValues) => {
    setCostData((prev) => {
      const updated = { ...prev };

      selectedSkus.forEach((sku) => {
        updated[sku] = {
          ...updated[sku],
          ...bulkValues,
        };
      });

      return updated;
    });

    setSelectedSkus([]);
    setFormMessage("");
    setMode("cost");
  };

  const handleContinue = () => {
    if (invalidRowCount > 0) {
      setFormMessage(
        `${invalidRowCount} SKU rows have invalid values. Please fix them before continuing.`,
      );
      return;
    }

    if (missingCostCount > 0) {
      setFormMessage(
        `${missingCostCount} SKUs still need a product cost. Please enter all product costs to generate the report.`,
      );
      return;
    }

    onClose();
  };

  const canContinue = missingCostCount === 0 && invalidRowCount === 0;

  return (
    <SkuCostModalLayout
      title={`${skus.length} SKUs found`}
      mode={mode}
      onStartAgain={onStartAgain}
      onBulkEdit={() => {
        setFormMessage("");
        setMode("bulk");
      }}
      onCancelBulkEdit={() => {
        setSelectedSkus([]);
        setFormMessage("");
        setMode("cost");
      }}
    >
      {mode === "cost" ? (
        <SkuCostTableView
          skus={skus}
          costData={costData}
          updateCost={updateCost}
          getTotalCost={getTotalCost}
          missingCostCount={missingCostCount}
          invalidRowCount={invalidRowCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          showOnlyWithoutCost={showOnlyWithoutCost}
          setShowOnlyWithoutCost={setShowOnlyWithoutCost}
          itemsPerPage={ITEMS_PER_PAGE}
          canContinue={canContinue}
          formMessage={formMessage}
          onContinue={handleContinue}
        />
      ) : (
        <SkuBulkEditView
          skus={skus}
          costData={costData}
          selectedSkus={selectedSkus}
          setSelectedSkus={setSelectedSkus}
          onApply={applyBulkEdit}
        />
      )}
    </SkuCostModalLayout>
  );
}

export default SkuCostModal;
