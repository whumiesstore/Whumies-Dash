import reportDataAmazon from "../../../data/reportDataAmazon.json";
import reportDataFlipkart from "../../../data/reportDataFlipkart.json";

import { formatOrders } from "../../../utils/formatters";

function getPercent(value, total) {
  const safeValue = Number(value || 0);
  const safeTotal = Number(total || 0);

  if (safeTotal <= 0) return "0.00%";

  return `${((safeValue / safeTotal) * 100).toFixed(2)}%`;
}

function formatOrderUnitText(orders, units, percentText) {
  return (
    <>
      <strong>{formatOrders(orders)} orders</strong>
      {percentText && <span>({percentText})</span>}
      {units !== undefined && units !== null && (
        <span className="order-units-text">{formatOrders(units)} Units</span>
      )}
    </>
  );
}

function OrderBreakdownRow({
  item,
  parentTotal,
  overallTotal,
  rowClassName,
  parentLabel,
}) {
  const parentPercent = getPercent(item.orders, parentTotal);
  const totalPercent = getPercent(item.orders, overallTotal);

  return (
    <div className={`order-breakdown-row ${rowClassName}`}>
      <div className="order-breakdown-left">
        <strong>{item.label}</strong>

        <div className="order-breakdown-percentages">
          <span>
            {parentPercent} of {parentLabel} Orders
          </span>

          <span>{totalPercent} of Total Orders</span>
        </div>
      </div>

      <div className="order-breakdown-right">
        <strong>{formatOrders(item.orders)}</strong>

        {item.units !== undefined && item.units !== null && (
          <span>({formatOrders(item.units)} Units)</span>
        )}
      </div>
    </div>
  );
}

function OrderSummarySection() {
  const data = reportDataFlipkart.orderSummary;

  const overallOrders = Number(data.overallOrders || 0);
  const overallUnits = data.overallUnits;

  const deliveredTotal = Number(data.delivered?.total || 0);
  const undeliveredTotal = Number(data.undelivered?.total || 0);

  const deliveredPercent = getPercent(deliveredTotal, overallOrders);
  const undeliveredPercent = getPercent(undeliveredTotal, overallOrders);

  return (
    <section className="order-summary-section">
      <div className="overall-orders-card">
        <h2>Overall Orders</h2>

        <div className="overall-orders-value">
          {formatOrderUnitText(overallOrders, overallUnits, "100%")}
        </div>
      </div>

      <div className="order-status-grid">
        <div className="order-status-card delivered-card">
          <h3>Delivered</h3>

          <div className="order-status-total delivered-total">
            {formatOrderUnitText(
              deliveredTotal,
              data.delivered?.units,
              deliveredPercent,
            )}
          </div>

          <div className="order-breakdown-list">
            {(data.delivered?.breakdown || []).map((item, index) => (
              <OrderBreakdownRow
                key={`${item.label}-${index}`}
                item={item}
                parentTotal={deliveredTotal}
                overallTotal={overallOrders}
                parentLabel="Delivered"
                rowClassName="green-row"
              />
            ))}
          </div>
        </div>

        <div className="order-status-card undelivered-card">
          <h3>Un-Delivered</h3>

          <div className="order-status-total undelivered-total">
            {formatOrderUnitText(
              undeliveredTotal,
              data.undelivered?.units,
              undeliveredPercent,
            )}
          </div>

          <div className="order-breakdown-list">
            {(data.undelivered?.breakdown || []).map((item, index) => (
              <OrderBreakdownRow
                key={`${item.label}-${index}`}
                item={item}
                parentTotal={undeliveredTotal}
                overallTotal={overallOrders}
                parentLabel="Un-Delivered"
                rowClassName="orange-row"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderSummarySection;
