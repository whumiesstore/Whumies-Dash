import { useState } from "react";
import { getFirmErrorMessage } from "../../../api/firmsApi";

function EditFirmModal({ firm, onClose, onUpdate }) {
  const [firmName, setFirmName] = useState(firm.firmName || "");
  const [isPrimary, setIsPrimary] = useState(Boolean(firm.isPrimary));
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firmName.trim()) {
      setError("Please enter a firm name.");
      return;
    }

    setIsSaving(true);
    setError("");

    try {
      await onUpdate({
        firmId: firm.id,
        firmName,
        isPrimary,
      });
    } catch (err) {
      setError(getFirmErrorMessage(err));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="edit-firm-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        <h3>Edit Firm</h3>
        <p>Update your firm name or make this firm primary.</p>

        {error && <div className="firm-modal-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="editFirmName">Firm Name *</label>

          <input
            id="editFirmName"
            type="text"
            value={firmName}
            onChange={(e) => {
              setFirmName(e.target.value);
              setError("");
            }}
            autoFocus
          />

          <label className="firm-checkbox-row">
            <input
              type="checkbox"
              checked={isPrimary}
              disabled={firm.isPrimary}
              onChange={(e) => setIsPrimary(e.target.checked)}
            />
            <span>
              {firm.isPrimary
                ? "This is already your primary firm"
                : "Make this my primary firm"}
            </span>
          </label>

          <div className="firm-modal-note">
            Amazon and Flipkart will remain enabled for this firm.
          </div>

          <button type="submit" className="save-firm-btn" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditFirmModal;
