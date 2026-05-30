function UploadSuccessModal({ monthDetails, onReupload, onContinue }) {
  return (
    <div className="upload-modal-overlay">
      <div className="upload-success-modal">
        <div className="success-title-row">
          <div className="success-check">✓</div>
          <h2>Orders File Processed Successfully!</h2>
        </div>

        <div className="success-month-box">
          <p>📊 Analysis Month:</p>
          <h3>{monthDetails.displayMonth}</h3>
        </div>

        <p className="success-note">
          Please verify this month. Next, you’ll enter product costs.
        </p>

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
