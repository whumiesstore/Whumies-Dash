import reportData from "../../../data/ReportData.json";
import { formatOrders } from "../../../utils/formatters";

function OrderSummarySection() {
  const data = reportData.orderSummary;

  return (
    <section className="order-summary-section">
      <div className="overall-orders-card">
        <h2>Overall Orders</h2>

        <div className="overall-orders-value">
          {formatOrders(data.overallOrders)}
        </div>
      </div>

      <div className="order-status-grid">
        <div className="order-status-card delivered-card">
          <h3>Delivered</h3>

          <div className="order-status-total delivered-total">
            {formatOrders(data.delivered.total)}
          </div>

          <div className="order-breakdown-list">
            {data.delivered.breakdown.map((item, index) => (
              <div className="order-breakdown-row green-row" key={index}>
                <span>{item.label}</span>
                <strong>{formatOrders(item.orders)}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="order-status-card undelivered-card">
          <h3>Un-Delivered</h3>

          <div className="order-status-total undelivered-total">
            {formatOrders(data.undelivered.total)}
          </div>

          <div className="order-breakdown-list">
            {data.undelivered.breakdown.map((item, index) => (
              <div className="order-breakdown-row orange-row" key={index}>
                <span>{item.label}</span>
                <strong>{formatOrders(item.orders)}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderSummarySection;
