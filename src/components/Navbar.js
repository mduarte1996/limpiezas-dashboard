import React from "react";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">

            <div className="logo">
                <img src="/logo-nuevo-lcb.png" alt="Limpiezas Costa Blanca" />
            </div>

            <ul className="nav-links">
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#servicios">Servicios</a></li>
                <li><a href="#sobre">Sobre nosotros</a></li>
                <li><a href="#contacto">Contacto</a></li>
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