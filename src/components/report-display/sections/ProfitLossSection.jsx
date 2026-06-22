import { useState } from "react";
import reportDataAmazon from "../../../data/ReportDataAmazon.json";
import reportDataFlipkart from "../../../data/reportDataFlipkart.json";
import { formatCurrency } from "../../../utils/formatters";
import { marketplaceConfig } from "../../../config/MarketplaceConfig";
import ReportInfoModal from "../common/ReportInfoModal";
import AngleRightIcon from "../../ui/icons/AngleRightIcon";

function InfoIcon({ info, onOpen }) {
  return (
    <button
      type="button"
      className="report-info-icon"
      onClick={(e) => {
        e.stopPropagation();
        onOpen(info);
      }}
      aria-label={`Explain ${info?.title || "this value"}`}
    >
      ?
    </button>
  );
}

function ExpandIcon({ isOpen }) {
  return (
    <span
      className={`section-expand-btn ${isOpen ? "open" : ""}`}
      aria-label="Expand breakdown"
    >
      <AngleRightIcon fill="#777777" width={13} height={13} />
    </span>
  );
}

function BreakdownRows({ rows = [] }) {
  return rows.map((item, index) => (
    <div
      className="profit-loss-row breakdown-row"
      key={`${item.name}-${index}`}
    >
      <div className="profit-loss-label breakdown-label">{item.name}</div>

      <div className="profit-loss-value">{formatCurrency(item.amount)}</div>
    </div>
  ));
}

function AmazonProfitLoss({ data, activeInfoSetter }) {
  const [isOtherChargesOpen, setIsOtherChargesOpen] = useState(false);
  const amazonHelpInfo = marketplaceConfig.amazon.profitLossSectionInfo;
  const isProfit = Number(data.profit) >= 0;

  return (
    <div className="profit-loss-table">
      <div className="profit-loss-row">
        <div className="profit-loss-label">
          Sales (Inc GST)
          <InfoIcon info={amazonHelpInfo.sales} onOpen={activeInfoSetter} />
        </div>

        <div className="profit-loss-value strong">
          {formatCurrency(data.salesIncGst)}
        </div>
      </div>

      <div className="profit-loss-row">
        <div className="profit-loss-label">
          Refunds, Cancellations, and Fees (Inc GST)
          <InfoIcon
            info={amazonHelpInfo.refundsFees}
            onOpen={activeInfoSetter}
          />
        </div>

        <div className="profit-loss-value">
          {formatCurrency(data.refundsCancellationsFeesIncGst)} (
          {data.refundsCancellationsFeesPercentage}%)
        </div>
      </div>

      <div className="profit-loss-row">
        <div className="profit-loss-label">
          Net Settlement Received (Inc GST)
          <InfoIcon
            info={amazonHelpInfo.netSettlement}
            onOpen={activeInfoSetter}
          />
        </div>

        <div className="profit-loss-value">
          {formatCurrency(data.netSettlementReceivedIncGst)} (
          {data.netSettlementPercentage}%)
        </div>
      </div>

      <button
        type="button"
        className="profit-loss-row clickable"
        onClick={() => setIsOtherChargesOpen((prev) => !prev)}
      >
        <div className="profit-loss-label orange">
          Other Charges
          <ExpandIcon isOpen={isOtherChargesOpen} />
        </div>

        <div className="profit-loss-value">
          {formatCurrency(data.otherCharges)}
        </div>
      </button>

      {isOtherChargesOpen && (
        <BreakdownRows rows={data.otherChargesBreakdown || []} />
      )}

      <div className="profit-loss-row">
        <div className="profit-loss-label strong">
          Purchase Cost
          <InfoIcon
            info={amazonHelpInfo.purchaseCost}
            onOpen={activeInfoSetter}
          />
        </div>

        <div className="profit-loss-value">
          {formatCurrency(data.purchaseCost)}
        </div>
      </div>

      <ProfitRow
        profit={data.profit}
        roi={data.roi}
        helpInfo={amazonHelpInfo.profit}
        onOpenInfo={activeInfoSetter}
      />
    </div>
  );
}

function FlipkartProfitLoss({ data, activeInfoSetter }) {
  const [isSalesOpen, setIsSalesOpen] = useState(false);
  const [isOtherChargesOpen, setIsOtherChargesOpen] = useState(false);
  const flipkartHelpInfo = marketplaceConfig.flipkart.profitLossSectionInfo;

  const isAdSpendAvailable =
    data.adSpend !== undefined && data.adSpend !== null && data.adSpend !== "";

  return (
    <div className="profit-loss-table">
      <button
        type="button"
        className="profit-loss-row clickable"
        onClick={() => setIsSalesOpen((prev) => !prev)}
      >
        <div className="profit-loss-label">
          Sale <span className="inc-gst-text">(Inc GST)</span>
          <InfoIcon info={flipkartHelpInfo.sales} onOpen={activeInfoSetter} />
        </div>

        <div className="profit-loss-value strong row-value-with-arrow">
          {formatCurrency(data.salesIncGst)}
          <ExpandIcon isOpen={isSalesOpen} />
        </div>
      </button>

      {isSalesOpen && <BreakdownRows rows={data.salesBreakdown || []} />}

      <button
        type="button"
        className="profit-loss-row clickable"
        onClick={() => setIsOtherChargesOpen((prev) => !prev)}
      >
        <div className="profit-loss-label">
          Other Charges <span className="inc-gst-text">(Inc GST)</span>
          <InfoIcon
            info={flipkartHelpInfo.otherCharges}
            onOpen={activeInfoSetter}
          />
        </div>

        <div className="profit-loss-value strong row-value-with-arrow">
          {formatCurrency(data.otherCharges)}
          <ExpandIcon isOpen={isOtherChargesOpen} />
        </div>
      </button>

      {isOtherChargesOpen && (
        <BreakdownRows rows={data.otherChargesBreakdown || []} />
      )}

      <div className="profit-loss-row">
        <div className="profit-loss-label">
          Net Settlement (Order related settlements){" "}
          <span className="inc-gst-text">(Inc GST)</span>
          <InfoIcon
            info={flipkartHelpInfo.netSettlement}
            onOpen={activeInfoSetter}
          />
        </div>

        <div className="profit-loss-value">
          {formatCurrency(data.netSettlement)}
        </div>
      </div>

      {isAdSpendAvailable && (
        <div className="profit-loss-row">
          <div className="profit-loss-label">
            Ad Spend <span className="inc-gst-text">(Inc GST)</span>
            <InfoIcon
              info={flipkartHelpInfo.adSpend}
              onOpen={activeInfoSetter}
            />
          </div>

          <div className="profit-loss-value">
            {formatCurrency(data.adSpend)}
          </div>
        </div>
      )}

      <div className="profit-loss-row">
        <div className="profit-loss-label strong">
          Purchase Price
          <InfoIcon
            info={flipkartHelpInfo.purchasePrice}
            onOpen={activeInfoSetter}
          />
        </div>

        <div className="profit-loss-value">
          {formatCurrency(data.purchasePrice)}
        </div>
      </div>

      <ProfitRow
        profit={data.profit}
        roi={data.roi}
        helpInfo={flipkartHelpInfo.profit}
        onOpenInfo={activeInfoSetter}
      />
    </div>
  );
}

function ProfitRow({ profit, roi, helpInfo, onOpenInfo }) {
  const isProfit = Number(profit) >= 0;

  return (
    <div className="profit-loss-row profit-row">
      <div className="profit-loss-label profit-title">
        Profit
        <InfoIcon info={helpInfo} onOpen={onOpenInfo} />
      </div>

      <div className="profit-result-wrap">
        <div
          className={`profit-result-pill ${
            isProfit ? "profit-positive" : "profit-negative"
          }`}
        >
          {formatCurrency(profit)}
          {roi !== undefined && roi !== null && <span>(ROI: {roi}%)</span>}
        </div>

        {!isProfit && <span className="loss-pill">You are in loss</span>}
      </div>
    </div>
  );
}

function ProfitLossSection({ displayMonth, selectedMarketplace = "amazon" }) {
  const isFlipkart = selectedMarketplace === "flipkart";
  const data = isFlipkart
    ? reportDataFlipkart.profitLoss
    : reportDataAmazon.profitLoss;

  const [activeInfo, setActiveInfo] = useState(null);

  return (
    <>
      <section className="profit-loss-section">
        <h2>
          {data.title} for {displayMonth}
        </h2>

        {isFlipkart ? (
          <FlipkartProfitLoss data={data} activeInfoSetter={setActiveInfo} />
        ) : (
          <AmazonProfitLoss data={data} activeInfoSetter={setActiveInfo} />
        )}
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
