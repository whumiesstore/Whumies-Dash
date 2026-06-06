import { Link, useParams } from "react-router-dom";
import { marketplaceConfig } from "../../config/MarketplaceConfig";
import "./reportDisplay.css";

function ReportDisplayMain() {
  const { firmName, marketplace, year, month } = useParams();

  const decodedFirmName = decodeURIComponent(firmName || "");
  const selectedMarketplace = marketplace?.toLowerCase() || "amazon";
  const config =
    marketplaceConfig[selectedMarketplace] || marketplaceConfig.amazon;

  const reportDate = new Date(Number(year), Number(month) - 1, 1);
  const displayMonth = reportDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
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

      <section className="report-display-card">
        <h1>{config.title} Profit Report</h1>
        <p>
          {decodedFirmName} · {displayMonth}
        </p>

        <div className="report-placeholder">Report here.</div>
      </section>
    </div>
  );
}

export default ReportDisplayMain;
