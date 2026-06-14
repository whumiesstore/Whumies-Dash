import { useMemo, useState } from "react";
import RetPercentBar from "./RetPercentBar";

function formatNumber(value) {
  if (value === 0 || value === null || value === undefined) return "-";
  return Number(value).toLocaleString("en-IN");
}

function getRetPercent(row) {
  return row.total > 0 ? ((row.ret + row.rto) / row.total) * 100 : 0;
}

function SkuStateRow({ row }) {
  const [isOpen, setIsOpen] = useState(false);

  const stateRows = useMemo(() => {
    return row.states.map((state) => ({
      ...state,
      retPercent: getRetPercent(state),
    }));
  }, [row.states]);

  return (
    <>
      <tr className="sku-state-main-row">
        <td>
          <div className="sku-state-product-cell">
            <button
              type="button"
              className="sku-state-expand-btn"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Expand state breakdown"
            >
              {isOpen ? "⌄" : "›"}
            </button>

            <div className="sku-state-product-info">
              <strong>{row.sku}</strong>
              <span>{row.productName}</span>
            </div>

            <div className="sku-state-count-pill">{row.stateCount} states</div>
          </div>
        </td>

        <td className="count-total">{formatNumber(row.total)}</td>
        <td className="count-del">{formatNumber(row.del)}</td>
        <td className="count-clm">{formatNumber(row.clm)}</td>
        <td className="count-ret">{formatNumber(row.ret)}</td>
        <td className="count-rto">{formatNumber(row.rto)}</td>
        <td className="count-can">{formatNumber(row.can)}</td>
        <td>
          <RetPercentBar value={row.retPercent} />
        </td>
      </tr>

      {isOpen && (
        <tr className="sku-state-nested-row">
          <td colSpan="8">
            <div className="sku-state-nested-table-wrap">
              <table className="sku-state-nested-table">
                <thead>
                  <tr>
                    <th>STATE</th>
                    <th>Total</th>
                    <th>DEL</th>
                    <th>CLM</th>
                    <th>RET</th>
                    <th>RTO</th>
                    <th>CAN</th>
                    <th>Ret %</th>
                  </tr>
                </thead>

                <tbody>
                  {stateRows.map((state) => (
                    <tr key={`${row.sku}-${state.state}`}>
                      <td>{state.state}</td>
                      <td className="count-total">
                        {formatNumber(state.total)}
                      </td>
                      <td className="count-del">{formatNumber(state.del)}</td>
                      <td className="count-clm">{formatNumber(state.clm)}</td>
                      <td className="count-ret">{formatNumber(state.ret)}</td>
                      <td className="count-rto">{formatNumber(state.rto)}</td>
                      <td className="count-can">{formatNumber(state.can)}</td>
                      <td>
                        <RetPercentBar value={state.retPercent} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default SkuStateRow;
