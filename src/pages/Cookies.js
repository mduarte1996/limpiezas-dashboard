import React from "react";
import "./legal.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Cookies() {
    return (
        <>
            <Navbar />
            <div className="legal-page">
                <div className="legal-container">
                    <Link to="/" className="back-btn">
                        ← Volver al inicio
                    </Link>

                    <h1>Política de Cookies</h1>

                    <p>
                        Este sitio web utiliza cookies para mejorar la experiencia del usuario.
                    </p>

                    <h2>¿Qué son las cookies?</h2>

                    <p>
                        Las cookies son pequeños archivos que se almacenan en el navegador del
                        usuario para mejorar la navegación.
                    </p>

                    <h2>Tipos de cookies utilizadas</h2>

                    <ul>
                        <li>Cookies técnicas necesarias</li>
                        <li>Cookies de análisis (Google Analytics)</li>
                        <li>Cookies de personalización</li>
                    </ul>

                    <h2>Cookies de terceros</h2>

                    <p>
                        Esta web puede utilizar servicios de terceros como:
                    </p>

                    <ul>
                        <li>Google Analytics</li>
                        <li>WhatsApp</li>
                        <li>Google Fonts</li>
                    </ul>

                    <h2>Desactivar cookies</h2>

                    <p>
                        El usuario puede configurar su navegador para bloquear o eliminar
                        las cookies en cualquier momento.
                    </p>

                </div>
            </div>
            <Footer />
        </>
    );
}

export default Cookies;
