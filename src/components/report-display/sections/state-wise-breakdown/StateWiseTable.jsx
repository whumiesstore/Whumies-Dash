import SortableHeader from "./SortableHeader";
import StateWiseRow from "./StateWiseRow";

const sortableColumns = [
  { key: "total", label: "TOTAL" },
  { key: "del", label: "DEL" },
  { key: "clm", label: "CLM" },
  { key: "ret", label: "RET" },
  { key: "rto", label: "RTO" },
  { key: "can", label: "CAN" },
  { key: "retPercent", label: "RET %" },
];

function StateWiseTable({ rows, sortConfig, onSort }) {
  return (
    <div className="state-wise-table-wrap">
      <table className="state-wise-table">
        <thead>
          <tr>
            <th className="state-wise-state-th">STATE</th>

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
                <div className="state-wise-empty">No state data found.</div>
              </td>
            </tr>
          ) : (
            rows.map((row) => <StateWiseRow key={row.state} row={row} />)
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StateWiseTable;
