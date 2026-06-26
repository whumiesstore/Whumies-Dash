import { Link, useParams } from "react-router-dom";

import MarketplaceCard from "./MarketplaceCard";
import { marketplaceConfig } from "../../config/MarketplaceConfig";
import useFirm from "../../hooks/useFirm";
import FirmPageState from "../shared/FirmPageState";

import "./firmReports.css";

function FirmReportsMain() {
  const { firmId } = useParams();

  const { firm, firmName, isFirmLoading, firmError } = useFirm(firmId);

  if (isFirmLoading) {
    return <FirmPageState type="loading" message="Loading firm details..." />;
  }

  if (firmError || !firm) {
    return (
      <FirmPageState
        type="error"
        title="Unable to load this firm"
        message={firmError || "This firm could not be found."}
      />
    );
  }

  return (
    <main className="firm-reports-page">
      <div className="firm-breadcrumb">
        <Link to="/dashboard">My Firms</Link>
        <span>/</span>
        <strong>{firmName}</strong>
      </div>

      <div className="firm-reports-top">
        <div>
          <div className="firm-title-row">
            <h1>{firmName.toUpperCase()}</h1>

            {firm.isPrimary && (
              <span className="firm-primary-badge">Primary</span>
            )}
          </div>

          <p className="firm-reports-subtitle">
            Choose a marketplace to generate or view your profit reports.
          </p>

          <div className="firm-marketplace-summary">
            <span>Amazon</span>
            <span>Flipkart</span>
          </div>
        </div>

        <div className="report-actions">
          <button type="button" className="sample-report-btn">
            Sample Reports
          </button>
        </div>
      </div>

      <section className="marketplace-grid">
        {Object.entries(marketplaceConfig).map(([type, config]) => (
          <MarketplaceCard
            key={type}
            firmId={firm.id}
            type={type}
            label={config.subtitle}
            title={config.title}
            color={config.color}
          />
        ))}
      </section>
    </main>
  );
}

export default FirmReportsMain;
