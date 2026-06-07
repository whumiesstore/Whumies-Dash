import { useEffect } from "react";
import SkuStatusTable from "./SkuStatusTable";
import SkuCostBreakdown from "./SkuCostBreakdown";
import SkuProfitSummary from "./SkuProfitSummary";
import "./skuViewModal.css";

function buildFallbackDetails(product) {
  return {
    statusRows: [
      {
        type: "section",
        label: `Reached Customer (${Math.max(Number(product.units || 0) - 6, 0)} units)`,
      },
      {
        type: "status",
        label: "Delivered",
        description: "Sold & kept — not returned",
        units: Math.max(Number(product.units || 0) - 20, 0),
        settlement: Number(product.settlement || 0),
        statusType: "success",
      },
      {
        type: "status",
        label: "Delivered → Returned",
        description:
          "Reached customer, then returned — counted separately from Delivered",
        units: 14,
        settlement: -1522.04,
        statusType: "danger",
      },
      {
        type: "section",
        label: "Never Reached Customer (6 units)",
      },
      {
        type: "status",
        label: "Courier Return (RTO)",
        description: "Never reached the customer",
        units: 6,
        settlement: -1.84,
        statusType: "warning",
      },
    ],
    costBreakdown: {
      note: "Breakdown of units that contribute to the purchase cost calculation",
      rows: [
        {
          category: "Delivered",
          units: Math.max(Number(product.units || 0) - 20, 0),
          settlement: Number(product.settlement || 0),
          tone: "green",
        },
        {
          category: "Returned Claimed (SAFE-T)",
          units: 1,
          settlement: 0,
          tone: "blue",
        },
      ],
      total: {
        category: "Cost-bearing Units",
        units: Math.max(Number(product.units || 0) - 19, 0),
        settlement:
          Number(product.settlement || 0) - Number(product.purchaseCost || 0),
      },
      costFormula: {
        costPerUnit: 71.8,
        units: Math.max(Number(product.units || 0) - 19, 0),
        total: Number(product.purchaseCost || 0),
      },
    },
    profit: Number(product.profit || 0),
    costFooter: {
      product: 50,
      productGstPercent: 18,
      productGst: 9,
      packing: 10,
      packingGstPercent: 18,
      packingGst: 1.8,
      other: 1,
    },
  };
}

function SkuViewModal({ product, onClose }) {
  const details = product.details || buildFallbackDetails(product);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className="sku-view-overlay" onClick={onClose}>
      <div className="sku-view-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sku-view-header">
          <h2>{product.productName}</h2>

          <button type="button" onClick={onClose} aria-label="Close SKU modal">
            ×
          </button>
        </div>

        <div className="sku-view-body">
          <SkuStatusTable rows={details.statusRows} />

          <SkuCostBreakdown breakdown={details.costBreakdown} />

          <SkuProfitSummary
            profit={details.profit}
            costFooter={details.costFooter}
          />
        </div>
      </div>
    </div>
  );
}

export default SkuViewModal;
