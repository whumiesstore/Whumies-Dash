import { useNavigate } from "react-router-dom";

function FirmPageState({
  type = "loading",
  title = "Unable to load firm",
  message = "Loading firm details...",
  classPrefix = "firm-page",
}) {
  const navigate = useNavigate();

  if (type === "loading") {
    return (
      <main className={`${classPrefix}-state-page`}>
        <div className={`${classPrefix}-state-card`}>
          <div className={`${classPrefix}-loader`} />
          <p>{message}</p>
        </div>
      </main>
    );
  }

  return (
    <main className={`${classPrefix}-state-page`}>
      <div className={`${classPrefix}-error-card`}>
        <h2>{title}</h2>
        <p>{message}</p>

        <button type="button" onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    </main>
  );
}

export default FirmPageState;
