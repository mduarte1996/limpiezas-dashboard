import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { useTranslation } from "react-i18next";

function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);
    const { t, i18n } = useTranslation();

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

            <div className="lang-switch">
                <button onClick={() => i18n.changeLanguage("es")}>ES</button>
                <button onClick={() => i18n.changeLanguage("en")}>EN</button>
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
                <li>
                    <a href="#inicio" onClick={() => setMenuOpen(false)}>
                        {t("inicio")}
                    </a>
                </li>

                <li>
                    <a href="#servicios" onClick={() => setMenuOpen(false)}>
                        {t("servicios")}
                    </a>
                </li>

                <li>
                    <a href="#sobre" onClick={() => setMenuOpen(false)}>
                        {t("sobre")}
                    </a>
                </li>

                <li>
                    <a href="#contacto" onClick={() => setMenuOpen(false)}>
                        {t("contacto")}
                    </a>
                </li>
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