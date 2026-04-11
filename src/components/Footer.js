import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaTiktok, FaFacebookF } from "react-icons/fa";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">

            <div className="footer-container">
                {/* MARCA */}
                <div className="footer-col footer-brand">
                    <img src="/logo-nuevo-lcb.png" alt="Limpiezas Costa Blanca" />
                    <p> • Confianza</p>
                    <p> • Puntualidad</p>
                    <p> • Resultados impecables</p>
                </div>

                {/* CONTACTO */}
                <div className="footer-col">
                    <h3>Información de contacto</h3>
                    <p>Benidorm - España</p>
                    <p>📞 611 00 98 14</p>
                    <p>📧 info@limpiezacostablanca.com</p>
                </div>

                {/* MENÚ */}
                <div className="footer-col">
                    <h3>Menú</h3>
                    <a href="#inicio">Inicio</a>
                    <a href="#servicios">Servicios</a>
                    <a href="#sobre">Sobre nosotros</a>
                    <a href="#contacto">Contacto</a>
                </div>

                {/* REDES */}
                <div className="footer-col">
                    <h3>Síguenos</h3>

                    <div className="social-icons">
                        <a href="https://www.instagram.com/limpiezascostablanca/" target="_blank" rel="noopener noreferrer">
                            <FaInstagram />
                        </a>

                        <a href="https://www.tiktok.com/@limpiezascostablanca" target="_blank" rel="noopener noreferrer">
                            <FaTiktok />
                        </a>

                        <a href="https://www.facebook.com/limpiezascostablanca" target="_blank" rel="noopener noreferrer">
                            <FaFacebookF />
                        </a>
                    </div>
                </div>

            </div>

            {/* BARRA LEGAL */}
            <div className="footer-bottom">

                <p>© {new Date().getFullYear()} Limpiezas Costa Blanca</p>

                <div className="footer-links">
                    <Link to="/AvisoLegal">Aviso legal</Link>
                    <Link to="/Privacidad">Privacidad</Link>
                    <Link to="/Cookies">Cookies</Link>
                </div>

            </div>

        </footer>
    );
}

export default Footer;