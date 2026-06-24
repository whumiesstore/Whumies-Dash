import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

function OnboardingRoute() {
  const { isAuthenticated, isAuthLoading, needsOnboarding } = useAuth();

  if (isAuthLoading) {
    return (
      <div className="route-loader">
        <div className="route-loader-spinner" />
        <p>Checking your session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!needsOnboarding) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default OnboardingRoute;
