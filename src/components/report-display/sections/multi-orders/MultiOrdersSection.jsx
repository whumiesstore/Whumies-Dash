import reportData from "../../../../data/ReportData.json";
import MultiOrdersTable from "./MultiOrdersTable";
import "./multiOrders.css";

function MultiOrdersSection() {
  const data = reportData.multiOrders;
  const orders = data.orders || [];

  return (
    <section className="multi-orders-section">
      <div className="multi-orders-heading">
        <h2>{data.title}</h2>
        <p>{data.subtitle}</p>
      </div>

      <MultiOrdersTable orders={orders} />
    </section>
  );
}

export default MultiOrdersSection;