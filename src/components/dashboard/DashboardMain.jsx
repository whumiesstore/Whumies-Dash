import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { useAuth } from "../../auth/AuthContext";

import DashboardHeader from "./DashboardHeader";
import ActionButtons from "./ActionButtons";
import FirmCard from "./firm-card/FirmCard";
import AddFirmCard from "./firm-card/AddFirmCard";
import AddFirmModal from "./firm-card/AddFirmModal";
import EditFirmModal from "./firm-card/EditFirmModal";
import DeleteFirmModal from "./firm-card/DeleteFirmModal";

import {
  createFirm,
  deleteFirm,
  getFirmErrorMessage,
  getFirms,
  makeFirmPrimary,
  updateFirm,
} from "../../api/firmApi";

import "./dashboard.css";

function sortFirms(firms) {
  return [...firms].sort((a, b) => {
    if (a.isPrimary && !b.isPrimary) return -1;
    if (!a.isPrimary && b.isPrimary) return 1;
    return new Date(a.createdAt) - new Date(b.createdAt);
  });
}

function DashboardMain() {
  const { user } = useAuth();

  const [firms, setFirms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pageError, setPageError] = useState("");

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingFirm, setEditingFirm] = useState(null);
  const [deletingFirm, setDeletingFirm] = useState(null);

  const sortedFirms = useMemo(() => sortFirms(firms), [firms]);

  const fetchFirms = async ({ silent = false } = {}) => {
    if (silent) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    setPageError("");

    try {
      const result = await getFirms();
      setFirms(result?.data?.firms || []);
    } catch (error) {
      setPageError(getFirmErrorMessage(error));
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFirms();
  }, []);

  const handleCreateFirm = async ({ firmName, isPrimary }) => {
    try {
      const result = await createFirm({
        firmName: firmName.trim(),
        isPrimary,
      });

      toast.success(result?.message || "Firm created successfully.");
      setIsAddOpen(false);
      await fetchFirms({ silent: true });
    } catch (error) {
      throw error;
    }
  };

  const handleUpdateFirm = async ({ firmId, firmName, isPrimary }) => {
    try {
      const result = await updateFirm(firmId, {
        firmName: firmName.trim(),
        isPrimary,
      });

      toast.success(result?.message || "Firm updated successfully.");
      setEditingFirm(null);
      await fetchFirms({ silent: true });
    } catch (error) {
      throw error;
    }
  };

  const handleMakePrimary = async (firmId) => {
    try {
      const result = await makeFirmPrimary(firmId);
      toast.success(result?.message || "Primary firm updated.");
      await fetchFirms({ silent: true });
    } catch (error) {
      toast.error(getFirmErrorMessage(error));
    }
  };

  const handleDeleteFirm = async (firmId) => {
    try {
      const result = await deleteFirm(firmId);
      toast.success(result?.message || "Firm deleted successfully.");
      setDeletingFirm(null);
      await fetchFirms({ silent: true });
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
          onClick={() => fetchFirms({ silent: true })}
          disabled={isRefreshing || isLoading}
        >
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {isLoading && (
        <div className="dashboard-state-card">
          <div className="dashboard-loader" />
          <p>Loading your firms...</p>
        </div>
      )}

      {!isLoading && pageError && (
        <div className="dashboard-error-card">
          <h3>Unable to load firms</h3>
          <p>{pageError}</p>
          <button type="button" onClick={() => fetchFirms()}>
            Try Again
          </button>
        </div>
      )}

      {!isLoading && !pageError && (
        <section className="firm-grid">
          {sortedFirms.map((firm) => (
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
