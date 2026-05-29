import { Link, useNavigate, useParams } from "react-router-dom";
import { marketplaceConfig } from "../../config/MarketplaceConfig";
import "./marketplaceReports.css";

function getReportMonths() {
  const today = new Date();

  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // Jan = 0

  const startDate = new Date(currentYear - 2, 3, 1); // April two years back
  const endDate = new Date(currentYear, currentMonth - 1, 1); // last completed month

  const months = [];
  const cursor = new Date(endDate);

  while (cursor >= startDate) {
    months.push({
      label: cursor
        .toLocaleString("en-US", { month: "short", year: "numeric" })
        .toUpperCase(),
      month: cursor.getMonth(),
      year: cursor.getFullYear(),
    });

    cursor.setMonth(cursor.getMonth() - 1);
  }

  return months;
}

function MarketplaceReportsMain() {
  const navigate = useNavigate();
  const { firmName, marketplace } = useParams();

  const decodedFirmName = decodeURIComponent(firmName || "");
  const selectedMarketplace = marketplace?.toLowerCase() || "amazon";

  const config =
    marketplaceConfig[selectedMarketplace] || marketplaceConfig.amazon;

  const reportMonths = getReportMonths();

  const openGenerateReportPage = (item) => {
    const monthValue = `${item.year}-${String(item.month + 1).padStart(2, "0")}`;

    navigate(
      `/dashboard/${firmName}/${selectedMarketplace}/generate-report?month=${monthValue}`,
    );
  };

  return (
    <div className="marketplace-reports-page">
      <div className="marketplace-report-breadcrumb">
        <Link to="/dashboard">My Firms</Link>
        <span>/</span>
        <Link to={`/dashboard/${firmName}`}>{decodedFirmName}</Link>
        <span>/</span>
        <strong style={{ color: config.color }}>{config.title}</strong>
      </div>

      <div className="marketplace-report-top">
        <div>
          <span
            className="marketplace-heading-line"
            style={{ background: config.color }}
          ></span>

          <h1>{config.title}</h1>
          <p>{decodedFirmName} · Monthly reports</p>
        </div>

        <div className="marketplace-report-actions">
          <a
            href={config.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="marketplace-light-btn"
            style={{ "--marketplace-color": config.color }}
          >
            ↗ {config.externalText}
          </a>

          <button
            type="button"
            className="marketplace-solid-btn"
            style={{ "--marketplace-color": config.color }}
          >
            ▶ {config.helpText}
          </button>
        </div>
      </div>

      <div className="monthly-report-table-wrap">
        <table className="monthly-report-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Net Profit</th>
              <th>Orders</th>
              <th>ROI</th>
              <th>Returns</th>
              <th>Settlement</th>
              <th>Ad Spend</th>
              <th>COGS</th>
              <th>Report</th>
            </tr>
          </thead>

          <tbody>
            {reportMonths.map((item) => (
              <tr key={`${item.month}-${item.year}`}>
                <td>{item.label}</td>
                <td>—</td>
                <td>—</td>
                <td>—</td>
                <td>—</td>
                <td>—</td>
                <td>—</td>
                <td>—</td>
                <td>
                  <button
                    type="button"
                    className="generate-month-btn"
                    style={{ "--marketplace-color": config.color }}
                    onClick={() => openGenerateReportPage(item)}
                  >
                    Generate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MarketplaceReportsMain;
