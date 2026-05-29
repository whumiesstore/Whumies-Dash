import DashboardHeader from "./DashboardHeader";
import ActionButtons from "./ActionButtons";
import FirmCard from "./firm-card/FirmCard";
import AddFirmCard from "./firm-card/AddFirmCard";
import "./dashboard.css";

function DashboardMain() {
  return (
    <main className="dashboard-page">
      <DashboardHeader userName="Lokesh" />
      <ActionButtons />

      <div className="dashboard-divider" />

      <section className="firm-grid">
        <FirmCard firmName="Whumies" isPrimary={true} />
        <AddFirmCard />
      </section>
    </main>
  );
}

export default DashboardMain;
