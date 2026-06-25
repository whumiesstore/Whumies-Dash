import { useState } from "react";
import { getFirmErrorMessage } from "../../../api/firmApi";

function AddFirmModal({ onClose, onCreate }) {
  const [firmName, setFirmName] = useState("");
  const [isPrimary, setIsPrimary] = useState(false);
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
      await onCreate({
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

        <h3>Add New Firm</h3>
        <p>
          Create another business firm.
        </p>

        {error && <div className="firm-modal-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="newFirmName">Firm Name *</label>

          <input
            id="newFirmName"
            type="text"
            value={firmName}
            onChange={(e) => {
              setFirmName(e.target.value);
              setError("");
            }}
            placeholder="Example: Whumies Kids"
            autoFocus
          />

          <label className="firm-checkbox-row">
            <input
              type="checkbox"
              checked={isPrimary}
              onChange={(e) => setIsPrimary(e.target.checked)}
            />
            <span>Make this my primary firm</span>
          </label>

          <button type="submit" className="save-firm-btn" disabled={isSaving}>
            {isSaving ? "Creating..." : "Create Firm"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddFirmModal;
