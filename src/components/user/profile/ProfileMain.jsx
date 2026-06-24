import { Navigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";

import ProfileStatusCard from "./ProfileStatusCard";
import ProfileDetailsForm from "./ProfileDetailsForm";
import ChangePasswordForm from "./ChangePasswordForm";

import "./profile.css";

function ProfileMain() {
  const {
    user,
    isAuthenticated,
    isAuthLoading,
    needsOnboarding,
    updateAuthUser,
  } = useAuth();

  if (isAuthLoading) {
    return (
      <div className="profile-page">
        <div className="profile-loading-card">Loading profile...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="profile-page">
      <section className="profile-page-top">
        <div>
          <span className="profile-heading-line" />
          <h1>My Profile</h1>
          <p>Manage your account details, business profile, and password.</p>
        </div>
      </section>

      <ProfileStatusCard user={user} needsOnboarding={needsOnboarding} />

      <div className="profile-grid">
        <ProfileDetailsForm user={user} onProfileUpdated={updateAuthUser} />
        <ChangePasswordForm />
      </div>
    </main>
  );
}

export default ProfileMain;
