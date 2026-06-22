import AmazonPaymentEntryRow from "./AmazonPaymentEntryRow";
import FlipkartPaymentEntryRow from "./FlipkartPaymentEntryRow";

function PaymentEntries({ entries = [], selectedMarketplace = "amazon" }) {
  const isFlipkart = selectedMarketplace === "flipkart";

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
        <div className="payment-entries-list">
          {entries.map((entry, index) =>
            isFlipkart ? (
              <FlipkartPaymentEntryRow
                key={`${entry.date || entry.id || "flipkart"}-${index}`}
                entry={entry}
                defaultOpen={index === 0}
              />
            ) : (
              <AmazonPaymentEntryRow
                key={`${entry.date || entry.id || "amazon"}-${index}`}
                entry={entry}
                defaultOpen={false}
              />
            ),
          )}
        </div>
      )}
    </section>
  );
}

export default PaymentEntries;
