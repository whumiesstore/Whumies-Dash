function SkuWiseHeader({ title, subtitle, totalProfit }) {
  return (
    <div className="sku-wise-header">
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <strong>Total Profit: {totalProfit}</strong>
    </div>
  );
}

export default SkuWiseHeader;
