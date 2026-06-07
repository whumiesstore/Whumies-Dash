function copyText(value) {
  navigator.clipboard?.writeText(value);
}

function SkuProductCell({ product }) {
  return (
    <div className="sku-product-detail-cell">
      <strong>{product.productName}</strong>

      <div className="sku-product-meta">
        <span>SKU: {product.sku}</span>
        <button type="button" onClick={() => copyText(product.sku)}>
          ⧉
        </button>

        <i>|</i>

        <span>
          ASIN: <b>{product.asin}</b>
        </span>
        <button type="button" onClick={() => copyText(product.asin)}>
          ⧉
        </button>
      </div>
    </div>
  );
}

export default SkuProductCell;
