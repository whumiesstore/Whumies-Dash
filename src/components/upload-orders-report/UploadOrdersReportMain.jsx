import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

import { marketplaceConfig } from "../../config/MarketplaceConfig";
import sampleSkus from "../../data/sampleSkus.json";

import UploadBox from "./UploadBox";
import UploadErrorModal from "./UploadErrorModal";
import UploadSuccessModal from "./UploadSuccessModal";
import SkuCostModal from "./sku-cost-modal/SkuCostModal";
import "./uploadOrdersReport.css";

function getMonthDetails(monthParam) {
  const fallbackDate = new Date();

  const [yearValue, monthValue] = monthParam
    ? monthParam.split("-").map(Number)
    : [fallbackDate.getFullYear(), fallbackDate.getMonth()];

  const date = new Date(yearValue, monthValue - 1, 1);

  const monthName = date.toLocaleString("en-US", { month: "long" });
  const shortMonth = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  const startDate = `01 ${shortMonth} ${year}`;
  const endDate = new Date(year, date.getMonth() + 1, 0).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  );

  return {
    monthName,
    year,
    displayMonth: `${monthName} ${year}`,
    startDate,
    endDate,
  };
}

function UploadOrdersReportMain() {
  const { firmName, marketplace } = useParams();
  const [searchParams] = useSearchParams();

  const [uploadError, setUploadError] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSkuCostModal, setShowSkuCostModal] = useState(false);

  const decodedFirmName = decodeURIComponent(firmName || "");
  const selectedMarketplace = marketplace?.toLowerCase() || "amazon";

  const config =
    marketplaceConfig[selectedMarketplace] || marketplaceConfig.amazon;

  const uploadConfig = config.upload;

  const monthParam = searchParams.get("month");
  const monthDetails = getMonthDetails(monthParam);

  return (
    <div className="upload-orders-page">
      <div className="upload-orders-breadcrumb">
        <Link to="/dashboard">My Firms</Link>
        <span>/</span>
        <Link to={`/dashboard/${firmName}`}>{decodedFirmName}</Link>
        <span>/</span>
        <Link to={`/dashboard/${firmName}/${selectedMarketplace}`}>
          {config.title}
        </Link>
        <span>/</span>
        <strong style={{ color: config.color }}>
          {monthDetails.displayMonth}
        </strong>
      </div>

      <section className="upload-orders-heading">
        <h1>Upload Your {uploadConfig.reportName}</h1>

        <p>
          Follow the steps below to download your orders file from{" "}
          {config.title} {config.externalText} and upload it here.{" "}
          <strong style={{ color: config.color }}>
            ({monthDetails.displayMonth})
          </strong>
        </p>
      </section>

      <section className="upload-orders-layout">
        <UploadBox
          config={config}
          uploadConfig={uploadConfig}
          monthDetails={monthDetails}
          onUploadSuccess={() => setShowSuccessModal(true)}
          onUploadError={(error) => setUploadError(error)}
        />

        <aside className="instruction-card">
          <div className="instruction-step">
            <div className="step-number">1</div>

            <div className="step-content">
              <h3>
                <span>↗</span> {uploadConfig.portalStepTitle}
              </h3>

              <p>{uploadConfig.portalStepDescription}</p>

              <a
                href={config.ordersReportUrl || config.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="instruction-link"
              >
                {uploadConfig.portalButtonText} <span>↗</span>
              </a>
            </div>
          </div>

          <div className="instruction-divider" />

          <div className="instruction-step">
            <div className="step-number">2</div>

            <div className="step-content">
              <h3>
                <span>▣</span> Set the Date Range
              </h3>

              <p>
                In the report settings, set the date range to cover the{" "}
                <strong>entire month:</strong>
              </p>

              <div className="date-range-boxes">
                <div className="date-box">
                  <span>Start Date</span>
                  <strong>{monthDetails.startDate}</strong>
                </div>

                <div className="date-arrow">→</div>

                <div className="date-box">
                  <span>End Date</span>
                  <strong>{monthDetails.endDate}</strong>
                </div>
              </div>

              <div className="month-pill">
                Reporting month: {monthDetails.displayMonth}
              </div>
            </div>
          </div>
        </aside>
      </section>

      {uploadError && (
        <UploadErrorModal
          title={uploadError.title}
          message={uploadError.message}
          detail={uploadError.detail}
          onClose={() => setUploadError(null)}
        />
      )}

      {showSuccessModal && (
        <UploadSuccessModal
          monthDetails={monthDetails}
          onReupload={() => setShowSuccessModal(false)}
          onContinue={() => {
            setShowSuccessModal(false);
            setShowSkuCostModal(true);
          }}
        />
      )}

      {showSkuCostModal && (
        <SkuCostModal
          skus={sampleSkus}
          onClose={() => setShowSkuCostModal(false)}
          onStartAgain={() => {
            setShowSkuCostModal(false);
          }}
        />
      )}
    </div>
  );
}

export default UploadOrdersReportMain;
