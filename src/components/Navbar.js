import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        <span>LCB</span>
      </div>

      <ul className="nav-links">
        <li><a href="/">Inicio</a></li>
        <li><a href="#services">Servicios</a></li>
        <li><a href="#about">Sobre nosotros</a></li>
        <li><a href="#contact">Contacto</a></li>
      </ul>

      <div className="nav-right">
        <a href="tel:+34611009814" className="phone-btn">
          📞 +34 611 00 98 14
        </a>
      </div>

    </nav>
  );
}

export default Navbar;