function SkuCostModalLayout({
  title,
  mode,
  onStartAgain,
  onBulkEdit,
  onCancelBulkEdit,
  children,
}) {
  return (
    <div className="sku-cost-modal-overlay">
      <div className="sku-cost-modal">
        <div className="sku-cost-header">
          <h2>{title}</h2>

          <div className="sku-cost-header-actions">
            <button
              type="button"
              className="sku-outline-btn"
              onClick={onStartAgain}
            >
              Start Again
            </button>

            {mode === "cost" ? (
              <button
                type="button"
                className="sku-primary-small-btn"
                onClick={onBulkEdit}
              >
                Bulk Edit
              </button>
            ) : (
              <button
                type="button"
                className="sku-primary-small-btn"
                onClick={onCancelBulkEdit}
              >
                Cancel Bulk Edit
              </button>
            )}
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}

export default SkuCostModalLayout;
