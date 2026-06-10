import { useMemo, useState } from "react";
import { formatCurrency } from "../../../../../utils/formatters";

function getEntryTotal(entry) {
  return (entry.breakdown || []).reduce((total, item) => {
    return total + Number(item.amount || 0);
  }, 0);
}

function PaymentEntryRow({ entry, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const total = useMemo(() => getEntryTotal(entry), [entry]);
  const credits = (entry.breakdown || []).filter(
    (item) => Number(item.amount) >= 0,
  );
  const deductions = (entry.breakdown || []).filter(
    (item) => Number(item.amount) < 0,
  );
  const isPositive = total >= 0;

  return (
    <div
      className={`payment-entry-row ${isPositive ? "positive" : "negative"}`}
    >
      <button
        type="button"
        className="payment-entry-main"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="payment-entry-date">{entry.date}</span>

        {entry.description && (
          <span className="payment-entry-description">{entry.description}</span>
        )}

        <strong className={isPositive ? "amount-positive" : "amount-negative"}>
          {isPositive ? "+" : ""}
          {formatCurrency(total)}
        </strong>

        <span className="payment-entry-chevron">{isOpen ? "⌃" : "⌄"}</span>
      </button>

      {isOpen && (
        <div className="payment-entry-breakdown">
          {credits.length > 0 && (
            <>
              <div className="breakdown-group-title credits">Credits</div>

              {credits.map((item, index) => (
                <div className="breakdown-line" key={`credit-${index}`}>
                  <span>{item.name}</span>
                  <strong className="amount-positive">
                    +{formatCurrency(item.amount)}
                  </strong>
                </div>
              ))}
            </>
          )}

          {deductions.length > 0 && (
            <>
              <div className="breakdown-group-title deductions">Deductions</div>

              {deductions.map((item, index) => (
                <div className="breakdown-line" key={`deduction-${index}`}>
                  <span>{item.name}</span>
                  <strong className="amount-negative">
                    {formatCurrency(item.amount)}
                  </strong>
                </div>
              ))}
            </>
          )}

          <div className="breakdown-net-line">
            <span>Net</span>
            <strong
              className={isPositive ? "amount-positive" : "amount-negative"}
            >
              {isPositive ? "+" : ""}
              {formatCurrency(total)}
            </strong>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentEntryRow;
