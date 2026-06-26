import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReportBreadcrumb from "../../shared/ReportBreadcrumb";
import GeneratingProfitReport from "./GeneratingProfitReport";

function ReportReady({
  firmId,
  firmName,
  selectedMarketplace,
  config,
  monthDetails,
  nextMonthDetails,
  skuCount = 0,
  adsReportStatus = "not-started",
}) {
  const navigate = useNavigate();
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  const isFlipkart = selectedMarketplace === "flipkart";

  const checklist = useMemo(() => {
    if (isFlipkart) {
      return [
        {
          label: "Orders report uploaded",
          value: monthDetails.displayMonth,
        },
        {
          label: "Payment report 1 uploaded",
          value: monthDetails.displayMonth,
        },
        {
          label: "Payment report 2 uploaded",
          value: nextMonthDetails?.displayMonth,
        },
        ...(adsReportStatus === "uploaded"
          ? [
              {
                label: "Ads report uploaded",
                value: monthDetails.displayMonth,
              },
            ]
          : []),
        {
          label: `SKU pricing mapped for ${skuCount} products`,
        },
      ];
    }

    return [
      {
        label: "Orders report uploaded",
        value: monthDetails.displayMonth,
      },
      {
        label: "Payments report uploaded",
        value: monthDetails.displayMonth,
      },
      {
        label: `SKU pricing mapped for ${skuCount} products`,
      },
    ];
  }, [
    isFlipkart,
    monthDetails.displayMonth,
    nextMonthDetails?.displayMonth,
    adsReportStatus,
    skuCount,
  ]);

  const handleGenerateProfitReport = () => {
    setIsGeneratingReport(true);

    // Mock backend report generation.
    // Later replace this with actual API call.
    setTimeout(() => {
      navigate(
        `/dashboard/firms/${firmId}/${selectedMarketplace}/${monthDetails.year}/${String(
          monthDetails.monthNumber,
        ).padStart(2, "0")}`,
      );
    }, 8000);
  };

  return (
    <div className="generate-report-page">
      <ReportBreadcrumb
        firmId={firmId}
        firmName={firmName}
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
            {checklist.map((item) => (
              <div className="report-ready-row" key={item.label}>
                <div>
                  <span className="ready-check">✓</span>
                  <strong>{item.label}</strong>
                </div>

                {item.value && <span>{item.value}</span>}
              </div>
            ))}
          </div>

          {isFlipkart && adsReportStatus === "skipped" && (
            <div className="report-ready-info-note">
              Ads report was skipped. Ad spend will not be deducted from this
              report.
            </div>
          )}

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
