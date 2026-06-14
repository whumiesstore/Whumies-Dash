import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { marketplaceConfig } from "../../config/MarketplaceConfig";
import ReportInitializer from "./ReportInitializer";
import ProfitLossSection from "./sections/ProfitLossSection";
import OrderSummarySection from "./sections/OrderSummarySection";
import FulfillmentDetailsSection from "./sections/FulfillmentDetailsSection";
import SkuWiseDetailsSection from "./sections/sku-wise-details/SkuWiseDetailsSection";
import OrderWiseDetailsSection from "./sections/order-wise-details/OrderWiseDetailsSection";
import MultiOrdersSection from "./sections/multi-orders/MultiOrdersSection";
import SkuStateBreakdownSection from "./sections/sku-state-breakdown/SkuStateBreakdownSection";

import "./reportDisplay.css";

function ReportDisplayMain() {
  const { firmName, marketplace, year, month } = useParams();

  const [isInitializing, setIsInitializing] = useState(true);

  const decodedFirmName = decodeURIComponent(firmName || "");
  const selectedMarketplace = marketplace?.toLowerCase() || "amazon";

  const config =
    marketplaceConfig[selectedMarketplace] || marketplaceConfig.amazon;

  const reportDate = new Date(Number(year), Number(month) - 1, 1);

  const displayMonth = reportDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const reportId = `#${selectedMarketplace.toUpperCase().slice(0, 2)}-${year}-${String(
    month,
  ).padStart(2, "0")}`;

  return (
    <div className="report-display-shell">
      <div className="report-display-page">
        <div className="report-display-breadcrumb">
          <Link to="/dashboard">My Firms</Link>
          <span>/</span>
          <Link to={`/dashboard/${firmName}`}>{decodedFirmName}</Link>
          <span>/</span>
          <Link to={`/dashboard/${firmName}/${selectedMarketplace}`}>
            {config.title}
          </Link>
          <span>/</span>
          <strong style={{ color: config.color }}>{displayMonth}</strong>
        </div>

        <div className="report-display-top">
          <div>
            <span
              className="report-display-heading-line"
              style={{ background: config.color }}
            />

            <h1>{displayMonth}</h1>
            <p>
              {decodedFirmName} · {config.title} report
            </p>
          </div>

          <div className="report-display-actions">
            <button type="button" className="report-outline-btn">
              Edit SKU Prices
            </button>

            <button type="button" className="report-primary-btn">
              Share
            </button>

            <span className="report-id-badge">Report ID: {reportId}</span>
          </div>
        </div>

        {isInitializing ? (
          <ReportInitializer onComplete={() => setIsInitializing(false)} />
        ) : (
          <div className="report-sections">
            <ProfitLossSection displayMonth={displayMonth} />
            <OrderSummarySection />
            <FulfillmentDetailsSection />
            <SkuWiseDetailsSection />
            <OrderWiseDetailsSection />
            <MultiOrdersSection />
            <SkuStateBreakdownSection />
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportDisplayMain;
