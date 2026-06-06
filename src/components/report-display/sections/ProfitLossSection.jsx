import { useState } from "react";
import reportData from "../../../data/ReportData.json";
import ReportInfoModal from "../common/ReportInfoModal";
import { formatCurrency } from "../../../utils/formatters";

const helpInfo = {
  sales: {
    title: "Sales (Inc GST)",
    description:
      "Total amount you earned from all Amazon orders including GST. This is the gross revenue before any deductions from Amazon.",
  },
  refundsFees: {
    title: "Refunds, Cancellations, and Fees (Inc GST)",
    description:
      "Total amount deducted from your sales which includes refunds, cancellations, commissions, referral fees, and other charges. These are taken out by Amazon before settlement.",
  },
  netSettlement: {
    title: "Net Settlement Received (Inc GST)",
    description:
      "Total amount Amazon settles to you after deducting refunds, fees, and charges from your total sales. This includes GST.",
  },
  purchaseCost: {
    title: "Purchase Cost",
    description:
      "Total cost of all products you bought to fulfill Amazon orders. If you included GST in your purchase price, this reflects the total with GST. If not, you'll pay GST separately from your profit.",
  },
  profit: {
    title: "Profit",
    description:
      "This profit doesn't include GST. Here's how GST works: When you buy from suppliers, you pay GST. When customers buy from you, they pay GST included in price. You can use the GST you paid suppliers as a credit. Platforms also give you credit for GST on shipping and ads. But after using all these credits, some GST still remains that you have to pay to the government from this profit.",
  },
};

function InfoIcon({ type, onOpen }) {
  return (
    <button
      type="button"
      className="report-info-icon"
      onClick={(e) => {
        e.stopPropagation();
        onOpen(helpInfo[type]);
      }}
      aria-label={`Explain ${helpInfo[type]?.title || "this value"}`}
    >
      ?
    </button>
  );
}

function ProfitLossSection({ displayMonth }) {
  const data = reportData.profitLoss;
  const isProfit = Number(data.profit) >= 0;
  const [activeInfo, setActiveInfo] = useState(null);

  return (
    <>
      <section className="profit-loss-section">
        <h2>
          {data.title} for {displayMonth}
        </h2>

        <div className="profit-loss-table">
          <div className="profit-loss-row">
            <div className="profit-loss-label">
              Sales (Inc GST)
              <InfoIcon type="sales" onOpen={setActiveInfo} />
            </div>

            <div className="profit-loss-value strong">
              {formatCurrency(data.salesIncGst)}
            </div>
          </div>

          <div className="profit-loss-row">
            <div className="profit-loss-label">
              Refunds, Cancellations, and Fees (Inc GST)
              <InfoIcon type="refundsFees" onOpen={setActiveInfo} />
            </div>

            <div className="profit-loss-value">
              {formatCurrency(data.refundsCancellationsFeesIncGst)} (
              {data.refundsCancellationsFeesPercentage}%)
            </div>
          </div>

          <div className="profit-loss-row">
            <div className="profit-loss-label">
              Net Settlement Received (Inc GST)
              <InfoIcon type="netSettlement" onOpen={setActiveInfo} />
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
              Purchase Cost
              <InfoIcon type="purchaseCost" onOpen={setActiveInfo} />
            </div>

            <div className="profit-loss-value">
              {formatCurrency(data.purchaseCost)}
            </div>
          </div>

          <div className="profit-loss-row profit-row">
            <div className="profit-loss-label profit-title">
              Profit
              <InfoIcon type="profit" onOpen={setActiveInfo} />
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

      {activeInfo && (
        <ReportInfoModal
          info={activeInfo}
          onClose={() => setActiveInfo(null)}
        />
      )}
    </>
  );
}

export default ProfitLossSection;
