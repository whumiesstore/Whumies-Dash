import { useState } from "react";
import CopyIcon from "../../../ui/icons/CopyIcon";
import CheckIcon from "../../../ui/icons/CheckIcon";

function getAmazonProductUrl(asin) {
  return `https://www.amazon.in/dp/${asin}`;
}

function SkuProductCell({ product, selectedMarketplace = "amazon" }) {
  const [copiedType, setCopiedType] = useState(null);

  const copyText = async (value, type) => {
    try {
      await navigator.clipboard.writeText(value);

      setCopiedType(type);

      setTimeout(() => {
        setCopiedType(null);
      }, 1200);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const isFlipkart = selectedMarketplace === "flipkart";

  return (
    <div className="sku-product-detail-cell">
      {isFlipkart ? (
        product.productName
      ) : (
        <a
          href={getAmazonProductUrl(product.asin)}
          target="_blank"
          rel="noopener noreferrer"
          className="sku-product-name-link"
        >
          {product.productName}
        </a>
      )}

      <div className="sku-product-meta">
        <span>SKU: {product.sku}</span>

        <button
          type="button"
          className="sku-copy-btn"
          onClick={() => copyText(product.sku, "sku")}
          aria-label="Copy SKU"
        >
          {copiedType === "sku" ? (
            <CheckIcon fill="#2f8f46" width={16} height={16} />
          ) : (
            <CopyIcon fill="#777777" width={15} height={15} />
          )}
        </button>

        <i>|</i>

        <span>
          {isFlipkart ? (
            <>
              FSN: <b>{product.fsn}</b>
            </>
          ) : (
            <>
              ASIN: <b>{product.asin}</b>
            </>
          )}
        </span>

        <button
          type="button"
          className="sku-copy-btn"
          onClick={
            isFlipkart
              ? () => copyText(product.fsn, "fsn")
              : () => copyText(product.asin, "asin")
          }
          aria-label={isFlipkart ? "Copy FSN" : "Copy ASIN"}
        >
          {copiedType === "asin" || copiedType === "fsn" ? (
            <CheckIcon fill="#2f8f46" width={16} height={16} />
          ) : (
            <CopyIcon fill="#777777" width={15} height={15} />
          )}
        </button>
      </div>
    </div>
  );
}

export default SkuProductCell;
