import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">

      <div className="logo">Simulation Lab</div>

      <div 
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>

        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/projectile">Projectile</NavLink></li>
        <li><NavLink to="/cell">Cell</NavLink></li>
        <li><NavLink to="/chemical">Chemical</NavLink></li>
        <li><NavLink to="/pulley">Pulley</NavLink></li>
        <li><NavLink to="/triangle">Triangle</NavLink></li>
        <li><NavLink to="/circuit">Circuit</NavLink></li>
        <li><NavLink to="/states">States</NavLink></li>
        <li><NavLink to="/solar">Solar</NavLink></li>
        <li><NavLink to="/logic">Logic</NavLink></li>
        <li><NavLink to="/market">Market</NavLink></li>

      </ul>

    </nav>
  );
}

export default Navbar;