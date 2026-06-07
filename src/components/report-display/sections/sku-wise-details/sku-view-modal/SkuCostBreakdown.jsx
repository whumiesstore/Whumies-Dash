import { formatCurrency } from "../../../../../utils/formatters";

function SkuCostBreakdown({ breakdown }) {
  if (!breakdown) return null;

  return (
    <div className="sku-cost-breakdown-card">
      <p>{breakdown.note}</p>

      <div className="sku-cost-table-wrap">
        <table className="sku-cost-breakdown-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Units</th>
              <th>Settlement (₹)</th>
            </tr>
          </thead>

          <tbody>
            {breakdown.rows.map((row, index) => (
              <tr key={index}>
                <td>{row.category}</td>
                <td className={`tone-${row.tone || "default"}`}>{row.units}</td>
                <td>{formatCurrency(row.settlement)}</td>
              </tr>
            ))}

            <tr className="cost-bearing-row">
              <td>{breakdown.total.category}</td>
              <td>{breakdown.total.units}</td>
              <td>{formatCurrency(breakdown.total.settlement)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="sku-cost-formula">
        <span>Cost per unit:</span>
        <strong>{formatCurrency(breakdown.costFormula.costPerUnit)}</strong>
        <span>×</span>
        <span>{breakdown.costFormula.units} units</span>
        <span>=</span>
        <b>{formatCurrency(breakdown.costFormula.total)}</b>
      </div>
    </div>
  );
}

export default SkuCostBreakdown;
