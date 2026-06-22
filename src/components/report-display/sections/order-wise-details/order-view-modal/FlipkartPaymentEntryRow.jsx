import { useMemo, useState } from "react";
import { formatCurrency } from "../../../../../utils/formatters";

function getEntryTotal(entry) {
  if (entry.amount !== undefined && entry.amount !== null) {
    return Number(entry.amount || 0);
  }

  return (entry.sections || []).reduce((sectionTotal, section) => {
    const rowsTotal = (section.rows || []).reduce((total, row) => {
      if (row.type === "text") return total;
      return total + Number(row.value || 0);
    }, 0);

    return sectionTotal + rowsTotal;
  }, 0);
}

function formatAmount(value) {
  const amount = Number(value || 0);

  if (amount === 0) return "-";

  return amount > 0 ? `+${formatCurrency(amount)}` : formatCurrency(amount);
}

function FlipkartPaymentEntryRow({ entry, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const total = useMemo(() => getEntryTotal(entry), [entry]);
  const isPositive = total >= 0;

  return (
    <article
      className={`flipkart-payment-entry-card ${
        isPositive ? "positive" : "negative"
      }`}
    >
      <button
        type="button"
        className="flipkart-payment-entry-top"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{entry.date || entry.description || ""}</span>

        <strong className={isPositive ? "positive-text" : "negative-text"}>
          {formatAmount(total)}
          <i className={isOpen ? "open" : ""}>⌃</i>
        </strong>
      </button>

      {isOpen && (
        <div className="flipkart-payment-entry-body">
          {(entry.sections || []).map((section, sectionIndex) => (
            <div
              className="flipkart-payment-section"
              key={`${section.title}-${sectionIndex}`}
            >
              <h4>{section.title}</h4>

              {(section.rows || []).map((row, rowIndex) => {
                const isAmount = row.type !== "text";
                const amount = Number(row.value || 0);

                return (
                  <div
                    className="flipkart-payment-row"
                    key={`${row.label}-${rowIndex}`}
                  >
                    <span>{row.label}</span>

                    <strong
                      className={
                        isAmount && amount > 0
                          ? "positive-text"
                          : isAmount && amount < 0
                            ? "negative-text"
                            : ""
                      }
                    >
                      {isAmount ? formatAmount(row.value) : row.value}
                    </strong>
                  </div>
                );
              })}
            </div>
          ))}

          <div className="flipkart-payment-net-row">
            <span>Net Settlement</span>

            <strong className={isPositive ? "positive-text" : "negative-text"}>
              {formatAmount(total)}
            </strong>
          </div>
        </div>
      )}
    </article>
  );
}

export default FlipkartPaymentEntryRow;
