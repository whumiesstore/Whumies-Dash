import { useNavigate } from "react-router-dom";
import EditIcon from "../../ui/icons/EditIcon";
import DeleteIcon from "../../ui/icons/DeleteIcon";

function FirmCard({ firm, onEdit, onDelete, onMakePrimary }) {
  const navigate = useNavigate();

  const openFirmReportPage = () => {
    navigate(`/dashboard/firms/${firm.id}`);
  };

  return (
    <article className={`firm-card active ${firm.isPrimary ? "primary" : ""}`}>
      <div className="firm-card-actions">
        <button
          type="button"
          className="firm-icon-btn"
          onClick={onEdit}
          aria-label="Edit firm"
          title="Edit firm"
        >
          <EditIcon fill="#bf0000" width={18} height={18} />
        </button>

        {!firm.isPrimary && (
          <>
            <button
              type="button"
              className="firm-icon-btn danger"
              onClick={onDelete}
              aria-label="Delete firm"
              title="Delete firm"
            >
              <DeleteIcon fill="#bf0000" width={18} height={18} />
            </button>

            <button
              type="button"
              className="firm-icon-btn primary-action"
              onClick={onMakePrimary}
              aria-label="Make this firm primary"
              title="Make this firm primary"
            >
              P
            </button>
          </>
        )}
      </div>

      {firm.isPrimary && <span className="tag">Primary Firm</span>}

      <h2>{firm.firmName.toUpperCase()}</h2>

      <div className="firm-marketplace-pills">
        <span>Amazon</span>
        <span>Flipkart</span>
      </div>

      <button
        type="button"
        className="generate-report-btn"
        onClick={openFirmReportPage}
      >
        Generate a REPORT
      </button>

      <ul>
        <li>
          <span>1</span> Pick Amazon or Flipkart
        </li>
        <li>
          <span>2</span> Upload your orders and payment files
        </li>
        <li>
          <span>3</span> Get your profit report in seconds
        </li>
      </ul>
    </article>
  );
}

export default FirmCard;
