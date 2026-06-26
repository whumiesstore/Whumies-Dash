import { useNavigate } from "react-router-dom";
import "./firmPageState.css";

function FirmPageState({
  type = "loading",
  title = "Unable to load firm",
  message = "Loading firm details...",
  backTo = "/dashboard",
  backLabel = "Back to Dashboard",
  className = "",
}) {
  const navigate = useNavigate();

  const isLoading = type === "loading";

  return (
    <main className={`firm-page-state ${className}`}>
      <section
        className={`firm-page-state-card ${isLoading ? "loading" : "error"}`}
      >
        {isLoading ? (
          <>
            <div className="firm-page-loader" />
            <p>{message}</p>
          </>
        ) : (
          <>
            <h2>{title}</h2>
            <p>{message}</p>

            <button type="button" onClick={() => navigate(backTo)}>
              {backLabel}
            </button>
          </>
        )}
      </section>
    </main>
  );
}

export default FirmPageState;
