function UploadErrorModal({ title, message, detail, onClose }) {
  return (
    <div className="upload-modal-overlay">
      <div className="upload-error-modal">
        <h2>{title}</h2>

        <div className="upload-error-box">
          <p className="upload-error-message">{message}</p>
          <div className="upload-error-divider" />
          <p className="upload-error-detail">{detail}</p>
        </div>

        <button
          type="button"
          className="upload-modal-outline-btn"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default UploadErrorModal;
