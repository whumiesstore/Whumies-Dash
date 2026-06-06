import reportData from "../../../data/reportData.json";
import { formatCurrency } from "../../../utils/formatters";

function InfoIcon() {
  return <span className="report-info-icon">?</span>;
}

function ProfitLossSection({ displayMonth }) {
  const data = reportData.profitLoss;
  const isProfit = Number(data.profit) >= 0;

  return (
    <section className="profit-loss-section">
      <h2>
        {data.title} for {displayMonth}
      </h2>

      <div className="profit-loss-table">
        <div className="profit-loss-row">
          <div className="profit-loss-label">
            Sales (Inc GST) <InfoIcon />
          </div>
          <div className="profit-loss-value strong">
            {formatCurrency(data.salesIncGst)}
          </div>
        </div>

        <div className="profit-loss-row">
          <div className="profit-loss-label">
            Refunds, Cancellations, and Fees (Inc GST) <InfoIcon />
          </div>
          <div className="profit-loss-value">
            {formatCurrency(data.refundsCancellationsFeesIncGst)} (
            {data.refundsCancellationsFeesPercentage}%)
          </div>
        </div>

        <div className="profit-loss-row">
          <div className="profit-loss-label">
            Net Settlement Received (Inc GST) <InfoIcon />
          </div>
          <div className="profit-loss-value">
            {formatCurrency(data.netSettlementReceivedIncGst)} (
            {data.netSettlementPercentage}%)
          </div>
        </div>

        <button type="button" className="profit-loss-row clickable">
          <div className="profit-loss-label orange">
            Other Charges (Click to view breakdown)
          </div>
          <div className="profit-loss-value">
            {formatCurrency(data.otherCharges)}
          </div>
        </button>

        <div className="profit-loss-row">
          <div className="profit-loss-label strong">
            Purchase Cost <InfoIcon />
          </div>
          <div className="profit-loss-value">
            {formatCurrency(data.purchaseCost)}
          </div>
        </div>

        <div className="profit-loss-row profit-row">
          <div className="profit-loss-label profit-title">
            Profit <InfoIcon />
          </div>

          <div className="profit-result-wrap">
            <div
              className={`profit-result-pill ${
                isProfit ? "profit-positive" : "profit-negative"
              }`}
            >
              {formatCurrency(data.profit)} <span>(ROI:{data.roi}%)</span>
            </div>

            {!isProfit && <span className="loss-pill">You are in loss</span>}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfitLossSection;
