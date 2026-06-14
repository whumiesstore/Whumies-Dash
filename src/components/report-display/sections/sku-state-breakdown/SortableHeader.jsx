function SortableHeader({ column, sortConfig, onSort }) {
  const isActive = sortConfig.key === column.key;

  const arrow = isActive ? (sortConfig.direction === "desc" ? "↓" : "↑") : "↓";

  return (
    <th>
      <button
        type="button"
        className={`sku-state-sort-btn ${isActive ? "active" : ""}`}
        onClick={() => onSort(column.key)}
      >
        <span className="sort-arrow">{arrow}</span>
        <span>{column.label}</span>
      </button>
    </th>
  );
}

export default SortableHeader;
