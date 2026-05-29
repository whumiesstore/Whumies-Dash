import { Link, useParams, useSearchParams } from "react-router-dom";
import { marketplaceConfig } from "../../config/MarketplaceConfig";
import "./generateReport.css";

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

function GenerateReportMain() {
  const { firmName, marketplace } = useParams();
  const [searchParams] = useSearchParams();

  const decodedFirmName = decodeURIComponent(firmName || "");
  const selectedMarketplace = marketplace?.toLowerCase() || "amazon";

  const config =
    marketplaceConfig[selectedMarketplace] || marketplaceConfig.amazon;

  const uploadConfig = config.upload;

  const monthParam = searchParams.get("month");
  const monthDetails = getMonthDetails(monthParam);

  return (
    <div className="generate-report-page">
      <div className="generate-breadcrumb">
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

      <section className="generate-heading">
        <h1>Upload Your {uploadConfig.reportName}</h1>

        <p>
          Follow the steps below to download your orders file from{" "}
          {config.title} {config.externalText} and upload it here.{" "}
          <strong style={{ color: config.color }}>
            ({monthDetails.displayMonth})
          </strong>
        </p>
      </section>

      <section className="generate-layout">
        <div className="upload-box">
          <input
            id="ordersFile"
            type="file"
            accept={uploadConfig.acceptedFileTypes}
            hidden
          />

          <label htmlFor="ordersFile" className="upload-main-btn">
            <span>☁</span>
            {uploadConfig.uploadButtonText} — {monthDetails.displayMonth}
          </label>

          <p>{uploadConfig.dragDropText}</p>
          <small>{uploadConfig.acceptedText}</small>
        </div>

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
    </div>
  );
}

export default GenerateReportMain;
