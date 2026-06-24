import { Link } from "react-router-dom";

function ProfileStatusCard({ user, needsOnboarding }) {
  return (
    <section className="profile-status-card">
      <div>
        <span
          className={`profile-status-dot ${
            needsOnboarding ? "incomplete" : "complete"
          }`}
        />

        <div>
          <h2>{needsOnboarding ? "Profile Incomplete" : "Profile Complete"}</h2>

          <p>
            {needsOnboarding
              ? "Complete onboarding to unlock your full dashboard experience."
              : "Your profile is ready and your dashboard access is active."}
          </p>
        </div>
      </div>

      {needsOnboarding ? (
        <Link to="/onboarding" className="profile-onboarding-link">
          Complete Onboarding
        </Link>
      ) : (
        <span className="profile-email-pill">{user?.email}</span>
      )}
    </section>
  );
}

export default ProfileStatusCard;
