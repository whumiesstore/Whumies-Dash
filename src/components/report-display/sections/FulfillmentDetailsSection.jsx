import reportData from "../../../data/ReportData.json";

function FulfillmentDetailsSection() {
  const data = reportData.fulfillmentDetails;

  return (
    <section className="fulfillment-details-section">
      <h2>{data.title}</h2>

      <div className="fulfillment-details-card">
        {data.items.map((item, index) => (
          <div className="fulfillment-row" key={`${item.label}-${index}`}>
            <span>{item.label}</span>
            <strong>{Number(item.value || 0).toLocaleString("en-IN")}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FulfillmentDetailsSection;
