function OrderViewMeta({ order }) {
  return (
    <div className="order-view-meta-grid">
      <div className="order-view-meta-box">
        <span>SKU</span>
        <strong>{order.sku}</strong>
      </div>

      <div className="order-view-meta-box">
        <span>Quantity</span>
        <strong>{order.quantity ?? order.units}</strong>
      </div>

      <div className="order-view-meta-box">
        <span>Date</span>
        <strong>{order.orderDate}</strong>
      </div>
    </div>
  );
}

export default OrderViewMeta;
