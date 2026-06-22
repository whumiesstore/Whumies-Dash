import { formatCurrency } from "../../../../utils/formatters";

function SkuWiseStats({ summary }) {
  return (
    <div className="sku-wise-stats">
      <span>
        <strong>Total:</strong> {formatCurrency(summary.totalProfit)}
      </span>

      <span>
        Total Units: {Number(summary.totalUnits || 0).toLocaleString("en-IN")}
      </span>

      <span>Total Settlement: {formatCurrency(summary.totalSettlement)}</span>

      <span>Average Profit: {formatCurrency(summary.averageProfit)}</span>
    </div>
  );
}

export default SkuWiseStats;
