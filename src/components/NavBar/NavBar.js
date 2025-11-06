import React, { useState } from "react";
import { FaAtom, FaBars, FaTimes } from "react-icons/fa";
import "./NavBar.css";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <FaAtom className="nav-icon" />
        <span className="nav-logo">Bazinga Memory</span>
      </div>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <a href="/">Home</a>
        <a href="#restart">Restart</a>
        <a href="#about">About</a>
      </div>

      <div className="burger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
}

export default NavBar;
