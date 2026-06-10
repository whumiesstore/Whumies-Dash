import OrderViewCell from "./OrderViewCell";

const statusLabels = {
  cancelled: "Cancelled",
  claimed: "Claimed",
  delivered: "Delivered",
  rto: "RTO",
  returned: "Returned",
};

function getSellerCentralUrl(orderId) {
  return `https://sellercentral.amazon.in/payments/event/view?accountType=ALL&orderId=${encodeURIComponent(
    orderId,
  )}&resultsPerPage=10&pageNumber=1`;
}

function OrderViewHeader({ order }) {
  return (
    <div className="order-view-header">
      <div className="order-view-id-row">
        <OrderViewCell order={order} />
        <div className="order-view-header-actions">
          <span className={`order-view-status ${order.status}`}>
            {statusLabels[order.status] || order.status}
          </span>

          <a
            href={getSellerCentralUrl(order.orderId)}
            target="_blank"
            rel="noopener noreferrer"
            className="order-view-seller-btn"
          >
            View on Seller Central
          </a>
        </div>
      </div>

      <h3>{order.productName}</h3>
    </div>
  );
}

export default OrderViewHeader;
