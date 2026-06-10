import { formatCurrency } from "../../../../../utils/formatters";

function OrderViewSummaryCards({ settlement, purchaseCost, profit }) {
  const isProfit = Number(profit || 0) >= 0;

  return (
    <div className="order-view-summary-grid">
      <div className="order-view-summary-card">
        <span>Settlement</span>
        <strong>{formatCurrency(settlement)}</strong>
      </div>

      <div className="order-view-summary-card">
        <span>Purchase Cost</span>
        <strong>-{formatCurrency(purchaseCost)}</strong>
      </div>

      <div
        className={`order-view-summary-card ${
          isProfit ? "profit-positive" : "profit-negative"
        }`}
      >
        <span>Net Profit</span>
        <strong>{formatCurrency(profit)}</strong>
      </div>
    </div>
  );
}

export default OrderViewSummaryCards;
