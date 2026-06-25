import { useMemo, useState } from "react";
import { getFirmErrorMessage } from "../../../api/firmsApi";

function DeleteFirmModal({ firm, onClose, onDelete }) {
  const [confirmName, setConfirmName] = useState("");
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const isConfirmed = useMemo(
    () => confirmName.trim() === firm.firmName,
    [confirmName, firm.firmName],
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isConfirmed) return;

    setIsDeleting(true);
    setError("");

    try {
      await onDelete(firm.id);
    } catch (err) {
      setError(getFirmErrorMessage(err));
    } finally {
      setIsDeleting(false);
    }
  };

  if (firm.isPrimary) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="edit-firm-modal danger-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>

          <h3>Primary firm cannot be deleted</h3>
          <p>Please make another firm primary before deleting this one.</p>

          <button type="button" className="save-firm-btn" onClick={onClose}>
            Got it
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="edit-firm-modal danger-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        <h3>Delete Firm</h3>
        <p>
          This action cannot be undone. To confirm, type{" "}
          <strong>{firm.firmName}</strong> below.
        </p>

        {error && <div className="firm-modal-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="deleteFirmName">Type firm name to confirm</label>

          <input
            id="deleteFirmName"
            type="text"
            value={confirmName}
            onChange={(e) => {
              setConfirmName(e.target.value);
              setError("");
            }}
            placeholder={firm.firmName}
            autoFocus
          />

          <button
            type="submit"
            className="delete-firm-confirm-btn"
            disabled={!isConfirmed || isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Firm"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default DeleteFirmModal;
