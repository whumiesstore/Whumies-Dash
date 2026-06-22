function UploadSuccessModal({
  monthDetails,
  title = "File Processed Successfully!",
  note = "Please verify this month before continuing.",
  onReupload,
  onContinue,
}) {
  return (
    <div className="upload-modal-overlay">
      <div className="upload-success-modal">
        <div className="success-title-row">
          <div className="success-check">✓</div>
          <h2>{title}</h2>
        </div>

        <div className="success-month-box">
          <p>📊 Analysis Month:</p>
          <h3>{monthDetails.displayMonth}</h3>
        </div>

        <p className="success-note">{note}</p>

        <div className="success-actions">
          <button
            type="button"
            className="upload-modal-outline-btn"
            onClick={onReupload}
          >
            Re-upload File
          </button>

          <button
            type="button"
            className="upload-modal-primary-btn"
            onClick={onContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadSuccessModal;
