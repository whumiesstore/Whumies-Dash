import PaymentEntryRow from "./PaymentEntryRow";

function PaymentEntries({ entries = [] }) {
  return (
    <section className="payment-entries-section">
      <div className="payment-entries-heading">
        <span>Payment Entries</span>
        <span>Amount</span>
      </div>

      {entries.length === 0 ? (
        <div className="payment-empty-state">
          <strong>No payment entries found.</strong>
          <p>Payments appear once the settlement report is processed.</p>
        </div>
      ) : (
        <div className="payment-entry-list">
          {entries.map((entry, index) => (
            <PaymentEntryRow
              key={`${entry.date}-${index}`}
              entry={entry}
              defaultOpen={false}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default PaymentEntries;
