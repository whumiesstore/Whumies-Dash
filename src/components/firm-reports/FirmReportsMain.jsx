import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import MarketplaceCard from "./MarketplaceCard";

import { marketplaceConfig } from "../../config/MarketplaceConfig";
import { getFirmById, getFirmErrorMessage } from "../../api/firmApi";

import "./firmReports.css";

function FirmReportsMain() {
  const { firmId } = useParams();
  const navigate = useNavigate();

  const [firm, setFirm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  useEffect(() => {
    async function fetchFirm() {
      setIsLoading(true);
      setPageError("");

      try {
        const result = await getFirmById(firmId);
        const fetchedFirm = result?.data?.firm || result?.data;

        setFirm(fetchedFirm);
      } catch (error) {
        setPageError(getFirmErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    }

    if (firmId) {
      fetchFirm();
    }
  }, [firmId]);

  if (isLoading) {
    return (
      <main className="firm-reports-page">
        <div className="firm-breadcrumb">
          <Link to="/dashboard">My Firms</Link>
          <span>/</span>
          <strong>Loading...</strong>
        </div>

        <div className="firm-reports-state-card">
          <div className="firm-reports-loader" />
          <p>Loading firm details...</p>
        </div>
      </main>
    );
  }

  if (pageError || !firm) {
    return (
      <main className="firm-reports-page">
        <div className="firm-breadcrumb">
          <Link to="/dashboard">My Firms</Link>
          <span>/</span>
          <strong>Firm Not Found</strong>
        </div>

        <div className="firm-reports-error-card">
          <h2>Unable to load this firm</h2>
          <p>{pageError || "This firm could not be found."}</p>

          <button type="button" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="firm-reports-page">
      <div className="firm-breadcrumb">
        <Link to="/dashboard">My Firms</Link>
        <span>/</span>
        <strong>{firm.firmName}</strong>
      </div>

      <div className="firm-reports-top">
        <div>
          <div className="firm-title-row">
            <h1>{firm.firmName.toUpperCase()}</h1>

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
          <button className="sample-report-btn">Sample Reports</button>
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
