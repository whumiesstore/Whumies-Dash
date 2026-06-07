import { formatCurrency } from "../../../../utils/formatters";
import CopyIcon from "../../../ui/icons/CopyIcon";

function copyText(value) {
  navigator.clipboard?.writeText(value);
}

const statusLabels = {
  cancelled: "Cancelled",
  claimed: "Claimed",
  delivered: "Delivered",
  rto: "RTO",
  returned: "Returned",
};

function OrderWiseTable({ orders, onViewOrder }) {
  return (
    <div className="order-wise-table-wrap">
      <table className="order-wise-table">
        <thead>
          <tr>
            <th>Order Id</th>
            <th>SKU</th>
            <th>Units</th>
            <th>Status</th>
            <th>Settlement</th>
            <th>Purchase</th>
            <th>Profit</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="8">
                <div className="order-wise-empty">No orders found.</div>
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={`${order.orderId}-${order.sku}`}>
                <td>
                  <span className="order-id-cell">
                    {order.orderId}
                    <button
                      type="button"
                      onClick={() => copyText(order.orderId)}
                      aria-label="Copy order id"
                    >
                      <CopyIcon fill="#777777" width={13} height={13} />
                    </button>
                  </span>
                </td>

                <td>{order.sku}</td>
                <td>{order.units}</td>

                <td>
                  <span className={`order-status-pill ${order.status}`}>
                    {statusLabels[order.status] || order.status}
                  </span>
                </td>

                <td>{formatCurrency(order.settlement)}</td>
                <td>{formatCurrency(order.purchase)}</td>
                <td>{formatCurrency(order.profit)}</td>

                <td>
                  <button
                    type="button"
                    className="order-view-btn"
                    onClick={() => onViewOrder(order)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OrderWiseTable;
