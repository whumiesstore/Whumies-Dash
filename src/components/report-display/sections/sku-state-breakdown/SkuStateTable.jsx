import SkuStateRow from "./SkuStateRow";
import SortableHeader from "./SortableHeader";

const sortableColumns = [
  { key: "total", label: "TOTAL" },
  { key: "del", label: "DEL" },
  { key: "clm", label: "CLM" },
  { key: "ret", label: "RET" },
  { key: "rto", label: "RTO" },
  { key: "can", label: "CAN" },
  { key: "retPercent", label: "RET %" },
];

function SkuStateTable({ rows, sortConfig, onSort }) {
  return (
    <div className="sku-state-table-wrap">
      <table className="sku-state-table">
        <thead>
          <tr>
            <th className="sku-state-product-th">SKU / PRODUCT</th>

            {sortableColumns.map((column) => (
              <SortableHeader
                key={column.key}
                column={column}
                sortConfig={sortConfig}
                onSort={onSort}
              />
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan="8">
                <div className="sku-state-empty">No SKU found.</div>
              </td>
            </tr>
          ) : (
            rows.map((row) => <SkuStateRow key={row.sku} row={row} />)
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SkuStateTable;
