import { useMemo, useState } from "react";
import RetPercentBar from "./RetPercentBar";
import AngleRightIcon from "../../../ui/icons/AngleRightIcon";

function formatNumber(value) {
  if (value === 0 || value === null || value === undefined) return "-";
  return Number(value).toLocaleString("en-IN");
}

function getRetPercent(row) {
  return Number(row.total || 0) > 0
    ? ((Number(row.ret || 0) + Number(row.rto || 0)) / Number(row.total || 0)) *
        100
    : 0;
}

function StateWiseRow({ row }) {
  const [isOpen, setIsOpen] = useState(false);

  const postalRows = useMemo(() => {
    return (row.postalCodes || []).map((postal) => ({
      ...postal,
      retPercent: getRetPercent(postal),
    }));
  }, [row.postalCodes]);

  return (
    <>
      <tr className="state-wise-main-row">
        <td>
          <div className="state-wise-state-cell">
            <button
              type="button"
              className={`state-wise-expand-btn ${isOpen ? "open" : ""}`}
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Expand postal breakdown"
            >
              <AngleRightIcon fill="#777777" width={13} height={13} />
            </button>

            <strong>{row.state}</strong>
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
        <tr className="state-wise-nested-row">
          <td colSpan="8">
            <div className="state-wise-nested-table-wrap">
              <table className="state-wise-nested-table">
                <thead>
                  <tr>
                    <th>POSTAL</th>
                    <th>TOTAL</th>
                    <th>DEL</th>
                    <th>CLM</th>
                    <th>RET</th>
                    <th>RTO</th>
                    <th>CAN</th>
                    <th>RET %</th>
                  </tr>
                </thead>

                <tbody>
                  {postalRows.map((postal) => (
                    <tr key={`${row.state}-${postal.postal}`}>
                      <td>{postal.postal}</td>
                      <td className="count-total">
                        {formatNumber(postal.total)}
                      </td>
                      <td className="count-del">{formatNumber(postal.del)}</td>
                      <td className="count-clm">{formatNumber(postal.clm)}</td>
                      <td className="count-ret">{formatNumber(postal.ret)}</td>
                      <td className="count-rto">{formatNumber(postal.rto)}</td>
                      <td className="count-can">{formatNumber(postal.can)}</td>
                      <td>
                        <RetPercentBar value={postal.retPercent} />
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

export default StateWiseRow;
