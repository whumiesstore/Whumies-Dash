import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReportBreadcrumb from "../shared/ReportBreadcrumb";
import GeneratingProfitReport from "./GeneratingProfitReport";

function ReportReady({
  firmName,
  decodedFirmName,
  selectedMarketplace,
  config,
  monthDetails,
  skuCount = 0,
}) {
  const navigate = useNavigate();
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  const handleGenerateProfitReport = () => {
    setIsGeneratingReport(true);

    // Mock backend report generation.
    // Later replace this with actual API call.
    setTimeout(() => {
      navigate(
        `/dashboard/${firmName}/${selectedMarketplace}/${monthDetails.year}/${String(
          monthDetails.monthNumber,
        ).padStart(2, "0")}`,
      );
    }, 8000);
  };

  return (
    <div className="generate-report-page">
      <ReportBreadcrumb
        firmName={firmName}
        decodedFirmName={decodedFirmName}
        selectedMarketplace={selectedMarketplace}
        marketplaceTitle={config.title}
        monthDetails={monthDetails}
        color={config.color}
      />

      {isGeneratingReport ? (
        <GeneratingProfitReport />
      ) : (
        <section className="report-ready-card">
          <h1>Your {config.title} report is ready</h1>

          <p>
            All required files are uploaded and SKU pricing is complete. Review
            the checklist and generate your profit report.
          </p>

          <div className="checks-completed-pill">✓ All checks completed</div>

          <div className="report-ready-checklist">
            <div className="report-ready-row">
              <div>
                <span className="ready-check">✓</span>
                <strong>Orders report uploaded</strong>
              </div>
              <span>{monthDetails.displayMonth}</span>
            </div>

            <div className="report-ready-row">
              <div>
                <span className="ready-check">✓</span>
                <strong>Payments report uploaded</strong>
              </div>
              <span>{monthDetails.displayMonth}</span>
            </div>

            <div className="report-ready-row">
              <div>
                <span className="ready-check">✓</span>
                <strong>SKU pricing mapped for {skuCount} products</strong>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="generate-profit-report-btn"
            onClick={handleGenerateProfitReport}
          >
            ▥ Generate Profit Report
          </button>

          <small>Usually ready in under a minute.</small>
        </section>
      )}
    </div>
  );
}

export default ReportReady;
