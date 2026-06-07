import { formatCurrency } from "../../../../../utils/formatters";

function SkuProfitSummary({ profit, costFooter }) {
  const isProfit = Number(profit || 0) >= 0;

  return (
    <>
      <div
        className={`sku-modal-profit-card ${isProfit ? "positive" : "negative"}`}
      >
        <strong>Profit</strong>
        <b>{formatCurrency(profit)}</b>
      </div>

      {costFooter && (
        <div className="sku-modal-cost-footer">
          <span>
            Product: <strong>{formatCurrency(costFooter.product)}</strong> + GST{" "}
            {costFooter.productGstPercent}%:{" "}
            <strong>{formatCurrency(costFooter.productGst)}</strong>
          </span>

          <span>
            Packing: <strong>{formatCurrency(costFooter.packing)}</strong> + GST{" "}
            {costFooter.packingGstPercent}%:{" "}
            <strong>{formatCurrency(costFooter.packingGst)}</strong>
          </span>

          <span>
            Other: <strong>{formatCurrency(costFooter.other)}</strong>
          </span>
        </div>
      )}
    </>
  );
}

export default SkuProfitSummary;
