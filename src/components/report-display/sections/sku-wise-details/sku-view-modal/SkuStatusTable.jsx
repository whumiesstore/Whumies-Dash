import { formatCurrency } from "../../../../../utils/formatters";

function SkuStatusTable({ rows = [] }) {
  return (
    <div className="sku-status-card">
      <table className="sku-status-table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Units</th>
            <th>Settlement (₹)</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => {
            if (row.type === "section") {
              return (
                <tr className="sku-status-section-row" key={index}>
                  <td colSpan="3">{row.label}</td>
                </tr>
              );
            }

            return (
              <tr key={index}>
                <td>
                  <strong className={`sku-status-name ${row.statusType || ""}`}>
                    {row.label}
                  </strong>
                  <span>{row.description}</span>
                </td>

                <td>{row.units}</td>
                <td>{formatCurrency(row.settlement)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default SkuStatusTable;
