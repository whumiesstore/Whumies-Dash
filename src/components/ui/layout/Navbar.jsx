import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="logo-wrapper">
          <img src="/logo_1.png" alt="Logo" width={175} height={50} />
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <a href="/">Home</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/amazon">Amazon</a>
          <a href="/flipkart">Flipkart</a>
        </nav>

        <div className={`nav-actions ${menuOpen ? "active" : ""}`}>
          <button className="btn btn-outline">Login / Register</button>
          <button className="btn btn-filled">My Profile</button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
