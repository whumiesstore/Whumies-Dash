import { Link } from "react-router-dom";

function ReportBreadcrumb({
  firmName,
  selectedMarketplace,
  marketplaceTitle,
  monthDetails,
  color,
}) {
  return (
    <div className="generate-report-breadcrumb">
      <Link to="/dashboard">My Firms</Link>
      <span>/</span>
      <Link to={`/dashboard/${firmName}`}>{firmName}</Link>
      <span>/</span>
      <Link to={`/dashboard/${firmName}/${selectedMarketplace}`}>
        {marketplaceTitle}
      </Link>
      <span>/</span>
      <strong style={{ color }}>{monthDetails.displayMonth}</strong>
    </div>
  );
}

export default ReportBreadcrumb;
