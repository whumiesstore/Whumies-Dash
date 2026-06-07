function copyText(value) {
  navigator.clipboard?.writeText(value);
}

function getAmazonProductUrl(asin) {
  return `https://www.amazon.in/dp/${asin}`;
}

function SkuProductCell({ product }) {
  return (
    <div className="sku-product-detail-cell">
      <a
        href={getAmazonProductUrl(product.asin)}
        target="_blank"
        rel="noopener noreferrer"
        className="sku-product-name-link"
      >
        {product.productName}
      </a>

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
