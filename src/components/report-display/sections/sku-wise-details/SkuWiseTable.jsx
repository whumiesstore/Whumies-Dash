import { formatCurrency } from "../../../../utils/formatters";
import SkuProductCell from "./SkuProductCell";

function SkuWiseTable({ products, onViewSku, selectedMarketplace = "amazon" }) {
  return (
    <div className="sku-wise-table-wrap">
      <table className="sku-wise-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Units</th>
            <th>Returns</th>
            <th>Settlement</th>
            <th>Purchase Cost</th>
            <th>Profit</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="7">
                <div className="sku-wise-empty">No SKU found.</div>
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr
                key={
                  selectedMarketplace === "amazon"
                    ? `${product.sku}-${product.asin}`
                    : `${product.sku}-${product.fsn}`
                }
              >
                <td>
                  <SkuProductCell
                    product={product}
                    selectedMarketplace={selectedMarketplace}
                  />
                </td>

                <td>{Number(product.units || 0).toLocaleString("en-IN")}</td>
                <td>{product.returns}%</td>
                <td>{formatCurrency(product.settlement)}</td>
                <td>{formatCurrency(product.purchaseCost)}</td>

                <td>
                  <div className="sku-profit-cell">
                    <strong
                      className={
                        Number(product.profit || 0) >= 0
                          ? "sku-profit-value positive"
                          : "sku-profit-value negative"
                      }
                    >
                      {formatCurrency(product.profit)}
                    </strong>

                    <span
                      className={
                        Number(product.profit || 0) >= 0
                          ? "sku-profit-badge"
                          : "sku-loss-badge"
                      }
                    >
                      {Number(product.profit || 0) >= 0 ? "Profit" : "Loss"}
                    </span>
                  </div>
                </td>

                <td>
                  <button
                    type="button"
                    className="sku-view-btn"
                    onClick={() => onViewSku(product)}
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

export default SkuWiseTable;
