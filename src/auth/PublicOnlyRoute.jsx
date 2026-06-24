import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

function PublicOnlyRoute() {
  const { isAuthenticated, isAuthLoading, needsOnboarding } = useAuth();

  if (isAuthLoading) {
    return (
      <div className="route-loader">
        <div className="route-loader-spinner" />
        <p>Checking your session...</p>
      </div>
    );
  }

  if (isAuthenticated && needsOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default PublicOnlyRoute;
