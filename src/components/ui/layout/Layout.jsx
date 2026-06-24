import Navbar from "./Navbar";
import { useAuth } from "../../../auth/AuthContext";

function Layout({ children }) {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <>
      <Navbar
        isLoggedIn={isAuthenticated}
        userName={user?.name || "My Profile"}
        onLogout={logout}
      />

      {children}
    </>
  );
}

export default Layout;
