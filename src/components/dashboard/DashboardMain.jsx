import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useAuth } from "../../auth/AuthContext";
import { useFirms } from "../../context/FirmsContext";
import { getFirmErrorMessage } from "../../api/firmApi";

import DashboardHeader from "./DashboardHeader";
import ActionButtons from "./ActionButtons";
import FirmCard from "./firm-card/FirmCard";
import AddFirmCard from "./firm-card/AddFirmCard";
import AddFirmModal from "./firm-card/AddFirmModal";
import EditFirmModal from "./firm-card/EditFirmModal";
import DeleteFirmModal from "./firm-card/DeleteFirmModal";

import "./dashboard.css";

function DashboardMain() {
  const { user } = useAuth();

  const {
    firms,
    isFirmsLoading,
    firmsError,
    fetchFirms,
    addFirm,
    editFirm,
    setPrimaryFirm,
    removeFirm,
  } = useFirms();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingFirm, setEditingFirm] = useState(null);
  const [deletingFirm, setDeletingFirm] = useState(null);

  useEffect(() => {
    fetchFirms();
  }, [fetchFirms]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchFirms({ silent: true });
    setIsRefreshing(false);
  };

  const handleCreateFirm = async ({ firmName, isPrimary }) => {
    try {
      const result = await addFirm({
        firmName,
        isPrimary,
      });

      toast.success(result?.message || "Firm created successfully.");
      setIsAddOpen(false);
    } catch (error) {
      throw error;
    }
  };

  const handleUpdateFirm = async ({ firmId, firmName, isPrimary }) => {
    try {
      const result = await editFirm(firmId, {
        firmName,
        isPrimary,
      });

      toast.success(result?.message || "Firm updated successfully.");
      setEditingFirm(null);
    } catch (error) {
      throw error;
    }
  };

  const handleMakePrimary = async (firmId) => {
    try {
      const result = await setPrimaryFirm(firmId);
      toast.success(result?.message || "Primary firm updated.");
    } catch (error) {
      toast.error(getFirmErrorMessage(error));
    }
  };

  const handleDeleteFirm = async (firmId) => {
    try {
      const result = await removeFirm(firmId);

      toast.success(result?.message || "Firm deleted successfully.");
      setDeletingFirm(null);
    } catch (error) {
      throw error;
    }
  };

  return (
    <main className="dashboard-page">
      <DashboardHeader userName={user?.name || "there"} />
      <ActionButtons />

      <div className="dashboard-divider" />

      <div className="dashboard-section-head">
        <div>
          <h2>Your Business Firms</h2>
          <p>Select a firm to generate marketplace reports.</p>
        </div>

        <button
          type="button"
          className="dashboard-refresh-btn"
          onClick={handleRefresh}
          disabled={isRefreshing || isFirmsLoading}
        >
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {isFirmsLoading && (
        <div className="dashboard-state-card">
          <div className="dashboard-loader" />
          <p>Loading your firms...</p>
        </div>
      )}

      {!isFirmsLoading && firmsError && (
        <div className="dashboard-error-card">
          <h3>Unable to load firms</h3>
          <p>{firmsError}</p>

          <button type="button" onClick={() => fetchFirms()}>
            Try Again
          </button>
        </div>
      )}

      {!isFirmsLoading && !firmsError && (
        <section className="firm-grid">
          {firms.map((firm) => (
            <FirmCard
              key={firm.id}
              firm={firm}
              onEdit={() => setEditingFirm(firm)}
              onDelete={() => setDeletingFirm(firm)}
              onMakePrimary={() => handleMakePrimary(firm.id)}
            />
          ))}

          <AddFirmCard onClick={() => setIsAddOpen(true)} />
        </section>
      )}

      {isAddOpen && (
        <AddFirmModal
          onClose={() => setIsAddOpen(false)}
          onCreate={handleCreateFirm}
        />
      )}

      {editingFirm && (
        <EditFirmModal
          firm={editingFirm}
          onClose={() => setEditingFirm(null)}
          onUpdate={handleUpdateFirm}
        />
      )}

      {deletingFirm && (
        <DeleteFirmModal
          firm={deletingFirm}
          onClose={() => setDeletingFirm(null)}
          onDelete={handleDeleteFirm}
        />
      )}
    </main>
  );
}

export default DashboardMain;
