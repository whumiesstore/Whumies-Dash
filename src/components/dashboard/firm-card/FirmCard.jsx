import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "../../ui/icons/EditIcon";

function FirmCard({ firmName = "Whumies Shopper", isPrimary = true }) {
  const navigate = useNavigate();

  const [currentFirmName, setCurrentFirmName] = useState(firmName);
  const [editedFirmName, setEditedFirmName] = useState(firmName);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const openFirmReportPage = () => {
    navigate(`/dashboard/${encodeURIComponent(currentFirmName)}`);
  };

  return (
    <>
      <article className="firm-card active">
        <button
          type="button"
          className="firm-edit-btn"
          onClick={() => {
            setEditedFirmName(currentFirmName);
            setIsEditOpen(true);
          }}
          aria-label="Edit firm name"
        >
          <EditIcon fill="#bf0000" width={18} height={18} />
        </button>

        {isPrimary && <span className="tag">Primary Firm</span>}

        <h2>{currentFirmName.toUpperCase()}</h2>

        <button
          type="button"
          className="generate-report-btn"
          onClick={openFirmReportPage}
        >
          Generate a REPORT
        </button>

        <ul>
          <li>
            <span>1</span> Pick Amazon, Flipkart, or Meesho
          </li>
          <li>
            <span>2</span> Upload your orders and payment files
          </li>
          <li>
            <span>3</span> Get your free profit report in seconds
          </li>
        </ul>
      </article>

      {isEditOpen && (
        <div className="modal-overlay" onClick={() => setIsEditOpen(false)}>
          <div className="edit-firm-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setIsEditOpen(false)}
              aria-label="Close modal"
            >
              ×
            </button>

            <h3>Edit Firm</h3>
            <p>Update your firm details below</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();

                if (!editedFirmName.trim()) return;

                setCurrentFirmName(editedFirmName.trim());
                setIsEditOpen(false);
              }}
            >
              <label htmlFor="firmName">Firm Name *</label>

              <input
                id="firmName"
                type="text"
                value={editedFirmName}
                onChange={(e) => setEditedFirmName(e.target.value)}
                autoFocus
              />

              <button type="submit" className="save-firm-btn">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default FirmCard;