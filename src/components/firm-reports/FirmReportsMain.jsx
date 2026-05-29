import { Link, useParams } from "react-router-dom";
import MarketplaceCard from "./MarketplaceCard";

import { marketplaceConfig } from "../../config/MarketplaceConfig";
import "./firmReports.css";

function FirmReportsMain() {
  const { firmName } = useParams();
  const decodedFirmName = decodeURIComponent(firmName || "");

  return (
    <div className="firm-reports-page">
      <div className="firm-breadcrumb">
        <Link to="/dashboard">My Firms</Link>
        <span>/</span>
        <strong>{decodedFirmName}</strong>
      </div>

      <div className="firm-reports-top">
        <h1>{decodedFirmName.toUpperCase()}</h1>

        <div className="report-actions">
          <button className="sample-report-btn">Sample Reports</button>
        </div>
      </div>

      <section className="marketplace-grid">
        {Object.entries(marketplaceConfig).map(([type, config]) => (
          <MarketplaceCard
            key={type}
            type={type}
            label={config.subtitle}
            title={config.title}
            color={config.color}
          />
        ))}
      </section>
    </div>
  );
}

export default FirmReportsMain;
