import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFirm from "../../hooks/useFirm";
import FirmPageState from "../shared/FirmPageState";

import WhyLockedModal from "./WhyLockedModal";
import {
  formatMonthYear,
  formatLongMonthYear,
  formatMonthDay,
} from "../../utils/formatters";
import { marketplaceConfig } from "../../config/MarketplaceConfig";

import LockIcon from "../ui/icons/LockIcon";
import "./marketplaceReports.css";

function getDaysRemaining(targetDate, today) {
  const oneDay = 1000 * 60 * 60 * 24;

  const start = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const end = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate(),
  );

  return Math.max(0, Math.ceil((end - start) / oneDay));
}

function getReportMonths() {
  const today = new Date();

  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const startDate = new Date(currentYear - 2, 3, 1); // Apr, 2 years back

  const latestPossibleReportMonth = new Date(currentYear, currentMonth - 1, 1);
  const latestPossibleUnlockDate = new Date(
    latestPossibleReportMonth.getFullYear(),
    latestPossibleReportMonth.getMonth() + 1,
    20,
  );

  let lockedMonth = null;
  let endDate;

  if (today >= latestPossibleUnlockDate) {
    endDate = latestPossibleReportMonth;
  } else {
    lockedMonth = {
      label: formatMonthYear(latestPossibleReportMonth),
      displayMonth: formatLongMonthYear(latestPossibleReportMonth),
      unlockDate: latestPossibleUnlockDate,
      unlockDateLabel: formatMonthDay(latestPossibleUnlockDate),
      daysRemaining: getDaysRemaining(latestPossibleUnlockDate, today),
      month: latestPossibleReportMonth.getMonth(),
      year: latestPossibleReportMonth.getFullYear(),
    };

    endDate = new Date(
      latestPossibleReportMonth.getFullYear(),
      latestPossibleReportMonth.getMonth() - 1,
      1,
    );
  }

  const months = [];
  const cursor = new Date(endDate);

  while (cursor >= startDate) {
    months.push({
      label: formatMonthYear(cursor),
      displayMonth: formatLongMonthYear(cursor),
      month: cursor.getMonth(),
      year: cursor.getFullYear(),
    });

    cursor.setMonth(cursor.getMonth() - 1);
  }

  return {
    availableMonths: months,
    lockedMonth,
  };
}

function MarketplaceReportsMain() {
  const navigate = useNavigate();
  const { firmId, marketplace } = useParams();
  const { firm, firmName, isFirmLoading, firmError } = useFirm(firmId);

  const [showWhyLockedModal, setShowWhyLockedModal] = useState(false);

  const selectedMarketplace = marketplace?.toLowerCase() || "amazon";

  const config =
    marketplaceConfig[selectedMarketplace] || marketplaceConfig.amazon;

  const { availableMonths, lockedMonth } = getReportMonths();

  const openGenerateReportPage = (item) => {
    const monthValue = `${item.year}-${String(item.month + 1).padStart(
      2,
      "0",
    )}`;

    navigate(
      `/dashboard/firms/${firmId}/${selectedMarketplace}/generate-report?month=${monthValue}`,
    );
  };

  if (isFirmLoading) {
    return (
      <FirmPageState type="loading" message="Loading marketplace reports..." />
    );
  }

  if (firmError || !firm) {
    return (
      <FirmPageState
        type="error"
        title="Unable to load firm"
        message={firmError || "This firm could not be found."}
      />
    );
  }

  return (
    <main className="marketplace-reports-page">
      <div className="marketplace-report-breadcrumb">
        <Link to="/dashboard">My Firms</Link>
        <span>/</span>
        <Link to={`/dashboard/firms/${firmId}`}>{firmName}</Link>
        <span>/</span>
        <strong style={{ color: config.color }}>{config.title}</strong>
      </div>

      <div className="marketplace-report-top">
        <div>
          <span
            className="marketplace-heading-line"
            style={{ background: config.color }}
          />

          <h1>{config.title}</h1>

          <p>{firmName} · Monthly reports</p>
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

      {lockedMonth && (
        <div className="locked-report-banner">
          <div className="locked-report-left">
            <span className="lock-icon">
              <LockIcon />
            </span>

            <strong>
              {lockedMonth.label} report can be generated after{" "}
              {lockedMonth.unlockDateLabel}
            </strong>

            <button type="button" onClick={() => setShowWhyLockedModal(true)}>
              Ask Why?
            </button>
          </div>

          <span className="days-remaining">
            {lockedMonth.daysRemaining} days remaining
          </span>
        </div>
      )}

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
            {availableMonths.map((item) => (
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

      {showWhyLockedModal && (
        <WhyLockedModal
          lockedMonth={lockedMonth}
          onClose={() => setShowWhyLockedModal(false)}
        />
      )}
    </main>
  );
}

export default MarketplaceReportsMain;
