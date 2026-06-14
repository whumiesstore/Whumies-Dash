import { useMemo, useState } from "react";
import reportData from "../../../../data/ReportData.json";
import SkuStateTable from "./SkuStateTable";
import "./skuStateBreakdown.css";

function getSkuTotals(item) {
  const totals = item.states.reduce(
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

  const retPercent =
    totals.total > 0 ? ((totals.ret + totals.rto) / totals.total) * 100 : 0;

  return {
    ...item,
    stateCount: item.states.length,
    ...totals,
    retPercent,
  };
}

function sortRows(rows, sortConfig) {
  if (!sortConfig.key) return rows;

  return [...rows].sort((a, b) => {
    const first = Number(a[sortConfig.key] || 0);
    const second = Number(b[sortConfig.key] || 0);

    if (sortConfig.direction === "desc") {
      return second - first;
    }

    return first - second;
  });
}

function SkuStateBreakdownSection() {
  const data = reportData.skuStateBreakdown;

  const [searchValue, setSearchValue] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "desc",
  });

  const skuRows = useMemo(() => {
    const rows = (data.skus || []).map(getSkuTotals);

    const query = searchValue.trim().toLowerCase();

    const filtered = rows.filter((item) => {
      if (!query) return true;

      return (
        item.sku.toLowerCase().includes(query) ||
        item.productName.toLowerCase().includes(query)
      );
    });

    return sortRows(filtered, sortConfig);
  }, [data.skus, searchValue, sortConfig]);

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
    <section className="sku-state-section">
      <div className="sku-state-top">
        <div>
          <h2>{data.title}</h2>
          <p>{data.subtitle}</p>
        </div>

        <label className="sku-state-search">
          <span>⌕</span>
          <input
            type="text"
            value={searchValue}
            placeholder="Search SKU..."
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </label>
      </div>

      <SkuStateTable
        rows={skuRows}
        sortConfig={sortConfig}
        onSort={handleSort}
      />
    </section>
  );
}

export default SkuStateBreakdownSection;
