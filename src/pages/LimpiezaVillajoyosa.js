import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./legal.css";

function LimpiezaVillajoyosa() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Navbar />
            <Link to="/" className="back-link">
                ← Volver al inicio
            </Link>

            <div className="legal-page">
                <div className="legal-container">
                    <img
                        src="/gestion-turistica.jpeg"
                        alt="Limpieza de viviendas y apartamentos turísticos en Villajoyosa"
                        className="seo-hero"
                    />

                    <h1>
                        Limpieza de viviendas y apartamentos turísticos en Villajoyosa
                    </h1>

                    <p>
                        En <strong>Limpiezas Costa Blanca</strong> ofrecemos
                        servicios profesionales de limpieza en Villajoyosa para
                        viviendas particulares, apartamentos turísticos,
                        alquileres vacacionales y propiedades de corta estancia.
                    </p>

                    <h2>Servicios disponibles en Villajoyosa</h2>

                    <ul>
                        <li>Limpieza de viviendas</li>
                        <li>Limpieza de apartamentos turísticos</li>
                        <li>Limpieza profunda</li>
                        <li>Limpieza de comunidades</li>
                        <li>Limpieza fin de obra</li>
                        <li>Gestión de alquiler turístico</li>
                        <li>Check-in y check-out de huéspedes</li>
                    </ul>

                    <h2>¿Por qué elegirnos?</h2>

                    <p>
                        Trabajamos con propietarios particulares,
                        gestores de apartamentos turísticos y viviendas
                        vacacionales en toda la zona de Villajoyosa.
                    </p>

                    <p>
                        Disponemos de transporte propio y ofrecemos
                        un servicio rápido, profesional y de confianza.
                    </p>

                    <h2>Zonas donde trabajamos</h2>

                    <p>
                        Prestamos servicios de limpieza y gestión de alquiler turístico
                        en Benidorm, Altea, Altea Hills, La Nucía, Villajoyosa,
                        Cala de Finestrat, Albir y Mascarat.
                    </p>

                    <h2>Solicita presupuesto gratuito</h2>

                    <p>
                        Contacta con nuestro equipo y recibe un presupuesto personalizado
                        sin compromiso para tu vivienda, apartamento turístico o propiedad vacacional.
                    </p>

                    <div className="cta-buttons">

                        <a
                            href="https://wa.me/34611009814"
                            target="_blank"
                            rel="noreferrer"
                            className="primary-btn"
                        >
                            Solicitar presupuesto por WhatsApp
                        </a>

                        <a
                            href="/#contacto"
                            className="secondary-btn"
                        >
                            Solicitar presupuesto online
                        </a>

                    </div>

                </div>
            </div>

            <Footer />
        </>
    );
}

export default LimpiezaVillajoyosa;