import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";

function Navbar({ isLoggedIn = false, userName = "My Profile" }) {
  const [menuOpen, setMenuOpen] = useState(false);

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
    { label: "Meesho", to: "/meesho" },
    { label: "Other Tools", to: "/other-tools" },
    { label: "Plans", to: "/plans" },
  ];

  const linksToShow = isLoggedIn ? privateLinks : publicLinks;

  const closeMenu = () => setMenuOpen(false);

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
            <Link to="/profile" className="btn btn-outline" onClick={closeMenu}>
              <span className="profile-icon">♟</span>
              {userName}
            </Link>
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
