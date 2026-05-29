import { useNavigate, useParams } from "react-router-dom";

function MarketplaceCard({ type, label, title, color }) {
  const navigate = useNavigate();
  const { firmName } = useParams();

  const openMarketplaceReport = () => {
    navigate(`/dashboard/${firmName}/${type}`);
  };

  return (
    <article
      className={`marketplace-card ${type}`}
      style={{ "--card-color": color }}
    >
      <span className="marketplace-line"></span>

      <p>{label}</p>
      <h2>{title}</h2>

      <div className="marketplace-divider"></div>

      <h3>Ready to track your profits?</h3>
      <span>Tap here to upload and calculate your first report.</span>

      <button type="button" onClick={openMarketplaceReport}>
        Get Started
      </button>
    </article>
  );
}

export default MarketplaceCard;
