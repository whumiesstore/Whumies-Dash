import { useMemo, useState } from "react";
import reportData from "../../../../data/ReportData.json";
import StateWiseTable from "./StateWiseTable";
import "./stateWiseBreakdown.css";

function getRetPercent(row) {
  return Number(row.total || 0) > 0
    ? ((Number(row.ret || 0) + Number(row.rto || 0)) / Number(row.total || 0)) *
        100
    : 0;
}

function getStateTotals(item) {
  const totals = item.postalCodes.reduce(
    (acc, row) => {
      acc.total += Number(row.total || 0);
      acc.del += Number(row.del || 0);
      acc.clm += Number(row.clm || 0);
      acc.ret += Number(row.ret || 0);
      acc.rto += Number(row.rto || 0);
      acc.can += Number(row.can || 0);
      return acc;
    },
    { total: 0, del: 0, clm: 0, ret: 0, rto: 0, can: 0 },
  );

  return {
    ...item,
    postalCount: item.postalCodes.length,
    ...totals,
    retPercent: getRetPercent(totals),
  };
}

function sortRows(rows, sortConfig) {
  if (!sortConfig.key) return rows;

  return [...rows].sort((a, b) => {
    const first = Number(a[sortConfig.key] || 0);
    const second = Number(b[sortConfig.key] || 0);

    return sortConfig.direction === "desc" ? second - first : first - second;
  });
}

function StateWiseBreakdownSection() {
  const data = reportData.stateWiseBreakdown;

  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "desc",
  });

  const rows = useMemo(() => {
    const mappedRows = (data.states || []).map(getStateTotals);
    return sortRows(mappedRows, sortConfig);
  }, [data.states, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((current) => {
      if (current.key !== key) {
        return { key, direction: "desc" };
      }

      return {
        key,
        direction: current.direction === "desc" ? "asc" : "desc",
      };
    });
  };

  return (
    <section className="state-wise-section">
      <div className="state-wise-top">
        <h2>
          {data.title} ({rows.length})
        </h2>
      </div>

      <StateWiseTable rows={rows} sortConfig={sortConfig} onSort={handleSort} />
    </section>
  );
}

export default StateWiseBreakdownSection;
