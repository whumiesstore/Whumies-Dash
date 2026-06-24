import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./navbar.css";

function Navbar({ isLoggedIn = false, userName = "My Profile", onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const publicLinks = [
    { label: "Home", to: "/" },
    { label: "Our Tools", to: "/#tools" },
    { label: "About Us", to: "/#about" },
    { label: "Contact Us", to: "/#contact" },
  ];

  const privateLinks = [
    { label: "Dashboard", to: "/dashboard" },
    { label: "Amazon", to: "/amazon" },
    { label: "Flipkart", to: "/flipkart" },
    { label: "Other Tools", to: "/other-tools" },
  ];

  const linksToShow = isLoggedIn ? privateLinks : publicLinks;

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = async () => {
    closeMenu();

    try {
      if (onLogout) {
        await onLogout();
      }

      toast.success("Logged out successfully.");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to={isLoggedIn ? "/dashboard" : "/"} className="logo-wrapper">
          <img src="/logo_1.png" alt="TheEcomWay" width={175} height={50} />
        </Link>

        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          {linksToShow.map((link) =>
            link.to.includes("#") ? (
              <a key={link.label} href={link.to} onClick={closeMenu}>
                {link.label}
              </a>
            ) : (
              <NavLink
                key={link.label}
                to={link.to}
                onClick={closeMenu}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {link.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className={`nav-actions ${menuOpen ? "active" : ""}`}>
          {isLoggedIn ? (
            <div className="navbar-user-actions">
              <Link
                to="/profile"
                className="btn btn-outline"
                onClick={closeMenu}
              >
                <span className="profile-icon">👤</span>
                {userName || "My Profile"}
              </Link>

              <button
                type="button"
                className="btn btn-filled"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-filled" onClick={closeMenu}>
              Login / Register
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
