import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaTiktok, FaFacebookF } from "react-icons/fa";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">

            <div className="footer-container">

                <div className="footer-logo">
                    <img src="/logo-nuevo-lcb.png" alt="logo" />

                    <ul>
                        <li>Confianza</li>
                        <li>Puntualidad</li>
                        <li>Resultados impecables</li>
                    </ul>
                </div>

                <div>
                    <h4>Información de contacto</h4>
                    <p>Benidorm - España</p>
                    <p>611 00 98 14</p>
                    <p>info@limpiezacostablanca.com</p>
                </div>

                <div>
                    <h4>Menú</h4>
                    <a href="#inicio">Inicio</a>
                    <a href="#servicios">Servicios</a>
                    <a href="#sobre">Sobre nosotros</a>
                    <a href="#contacto">Contacto</a>
                </div>

                <div>
                    <h4>Síguenos</h4>

                    <div className="social-icons">

                        <a
                            href="https://instagram.com/limpiezascostablanca"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaInstagram />
                        </a>

                        <a
                            href="https://tiktok.com/@limpiezascostablanca"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaTiktok />
                        </a>

                        <a
                            href="https://facebook.com/limpiezascostablanca"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaFacebookF />
                        </a>

                    </div>

                </div>

            </div>

            <div className="footer-divider"></div>

            <div className="footer-bottom">
                <div className="footer-bottom-container">

                    <p>© 2026 Limpiezas Costa Blanca</p>

                    <div className="footer-legal">
                        <Link to="/aviso-legal">Aviso legal</Link>
                        <Link to="/privacidad">Privacidad</Link>
                        <Link to="/cookies">Cookies</Link>
                    </div>

                </div>
            </div>

        </footer>
    );
}

export default Footer;