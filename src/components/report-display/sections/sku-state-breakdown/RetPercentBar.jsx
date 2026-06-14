function getTone(value) {
  if (value >= 25) return "danger";
  if (value >= 12) return "warning";
  return "success";
}

function RetPercentBar({ value }) {
  const safeValue = Number(value || 0);
  const width = Math.min(100, safeValue);

  return (
    <div className={`ret-percent-wrap ${getTone(safeValue)}`}>
      <span className="ret-track">
        <i style={{ width: `${width}%` }} />
      </span>

      <strong>{safeValue.toFixed(1)}%</strong>
    </div>
  );
}

export default RetPercentBar;
