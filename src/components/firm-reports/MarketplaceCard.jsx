import { useNavigate } from "react-router-dom";

function MarketplaceCard({ firmId, type, label, title, color }) {
  const navigate = useNavigate();

  const openMarketplaceReport = () => {
    navigate(`/dashboard/firms/${firmId}/${type}`);
  };

  return (
    <article
      className={`marketplace-card ${type}`}
      style={{ "--card-color": color }}
    >
      <span className="marketplace-line" />

      <p>{label}</p>
      <h2>{title}</h2>

      <div className="marketplace-divider" />

      <h3>Ready to track your profits?</h3>
      <span>
        Upload your orders and payment files to calculate your report.
      </span>

      <button type="button" onClick={openMarketplaceReport}>
        Get Started
      </button>
    </article>
  );
}

export default MarketplaceCard;
