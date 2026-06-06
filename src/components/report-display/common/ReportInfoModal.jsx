function ReportInfoModal({ info, onClose }) {
  if (!info) return null;

  return (
    <div className="report-info-modal-overlay" onClick={onClose}>
      <div className="report-info-modal" onClick={(e) => e.stopPropagation()}>
        <h3>{info.title}</h3>

        <p>{info.description}</p>

        <button type="button" onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  );
}

export default ReportInfoModal;
