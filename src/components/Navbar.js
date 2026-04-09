import React, { useState } from "react";
import "./Navbar.css";

function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">

            {/* LOGO */}
            <div className="logo">
                <img src="/logo-nuevo-lcb.png" alt="Limpiezas Costa Blanca" />
            </div>

            {/* BOTÓN MOBILE */}
            <button 
                className="menu-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                ☰
            </button>

            {/* LINKS */}
            <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
                <li><a href="#inicio" onClick={() => setMenuOpen(false)}>Inicio</a></li>
                <li><a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a></li>
                <li><a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre nosotros</a></li>
                <li><a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a></li>
            </ul>

            {/* TELÉFONO */}
            <div className="nav-right">
                <a href="tel:+34611009814" className="phone-btn">
                    📞 +34 611 00 98 14
                </a>
            </div>

        </nav>
    );
}

export default Navbar;