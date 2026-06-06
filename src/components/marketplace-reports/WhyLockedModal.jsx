function WhyLockedModal({ lockedMonth, onClose }) {
  if (!lockedMonth) return null;

  const nextMonthLabel = lockedMonth.unlockDate.toLocaleString("en-US", {
    month: "long",
  });

  const reportMonthLabel = lockedMonth.displayMonth;

  return (
    <div className="why-locked-modal-overlay" onClick={onClose}>
      <div className="why-locked-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Why this date?</h2>

        <p className="why-locked-subtitle">
          For {reportMonthLabel}, report generation opens on{" "}
          {lockedMonth.unlockDateLabel} for better accuracy.
        </p>

        <div className="why-locked-grid">
          <div className="why-locked-card">
            <h3>{reportMonthLabel.split(" ")[0]} 25-31</h3>
            <p>
              <strong>Dispatching:</strong> Late-month orders leave the
              warehouse and enter shipping.
            </p>
          </div>

          <div className="why-locked-card">
            <h3>{nextMonthLabel} 1-7</h3>
            <p>
              <strong>Delivering:</strong> Shipments are received by customers
              and delivery status stabilizes.
            </p>
          </div>

          <div className="why-locked-card">
            <h3>{nextMonthLabel} 8-14</h3>
            <p>
              <strong>Return window:</strong> Customers initiate returns and
              reverse logistics begins.
            </p>
          </div>

          <div className="why-locked-card">
            <h3>{nextMonthLabel} 15-21</h3>
            <p>
              <strong>Settlements and claims:</strong> Adjustments post, giving
              a more reliable final profit.
            </p>
          </div>
        </div>

        <div className="why-locked-actions">
          <button type="button" onClick={onClose}>
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

export default WhyLockedModal;