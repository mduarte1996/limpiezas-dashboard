import React, { useState, useEffect } from "react";
import "./Navbar.css";

function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);

    // cerrar al hacer scroll
    useEffect(() => {
        const handleScroll = () => setMenuOpen(false);
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className="navbar">

            {/* LOGO */}
            <div className="logo">
                <img src="/logo-nuevo-lcb.png" alt="Limpiezas Costa Blanca" />
            </div>

            {/* HAMBURGUESA */}
            <div 
                className={`hamburger ${menuOpen ? "active" : ""}`}
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>

            {/* LINKS */}
            <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
                <li><a href="#inicio" onClick={() => setMenuOpen(false)}>Inicio</a></li>
                <li><a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a></li>
                <li><a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre nosotros</a></li>
                <li><a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a></li>
            </ul>

            {/* BOTÓN TEL */}
            <div className="nav-right">
                <a href="tel:+34611009814" className="phone-btn">
                    📞 +34 611 00 98 14
                </a>
            </div>

        </nav>
    );
}

export default Navbar;