import { formatCurrency } from "../../../../utils/formatters";

function getAmazonProductUrl(asin) {
  return `https://www.amazon.in/dp/${asin}`;
}

function MultiOrdersTable({ orders }) {
  return (
    <div className="multi-orders-table-wrap">
      <table className="multi-orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>SKUs</th>
            <th>Payment (₹)</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="3">
                <div className="multi-orders-empty">No multi orders found.</div>
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.orderId}>
                <td className="multi-order-id">{order.orderId}</td>

                <td>
                  <div className="multi-sku-list">
                    {order.skus.map((item) => (
                      <div
                        className="multi-sku-row"
                        key={`${order.orderId}-${item.sku}-${item.asin}`}
                      >
                        <strong>{item.sku}</strong>

                        <span className="multi-units-pill">
                          Units: {item.units}
                        </span>

                        <i>|</i>

                        <a
                          href={getAmazonProductUrl(item.asin)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          ASIN: {item.asin}
                        </a>
                      </div>
                    ))}
                  </div>
                </td>

                <td className="multi-payment">
                  {formatCurrency(order.payment)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MultiOrdersTable;