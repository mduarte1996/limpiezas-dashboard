import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./legal.css";

function LimpiezaAltea() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Navbar />

            <div className="legal-page">
                <div className="legal-container">

                    <h1>
                        Servicio de limpieza en Altea
                    </h1>

                    <p>
                        En <strong>Limpiezas Costa Blanca</strong> ofrecemos
                        servicios profesionales de limpieza en Altea para
                        viviendas particulares, apartamentos turísticos,
                        alquileres vacacionales y propiedades de corta estancia.
                    </p>

                    <h2>Servicios disponibles en Altea</h2>

                    <ul>
                        <li>Limpieza de viviendas</li>
                        <li>Limpieza de apartamentos turísticos</li>
                        <li>Limpieza profunda</li>
                        <li>Limpieza fin de obra</li>
                        <li>Gestión de alquiler turístico</li>
                        <li>Check-in y check-out de huéspedes</li>
                    </ul>

                    <h2>¿Por qué elegirnos?</h2>

                    <p>
                        Trabajamos con propietarios particulares,
                        gestores de apartamentos turísticos y viviendas
                        vacacionales en toda la zona de Altea.
                    </p>

                    <p>
                        Disponemos de transporte propio y ofrecemos
                        un servicio rápido, profesional y de confianza.
                    </p>

                    <div style={{ marginTop: "30px" }}>
                        <a
                            href="https://wa.me/34611009814"
                            target="_blank"
                            rel="noreferrer"
                            className="primary-btn"
                        >
                            Solicitar presupuesto por WhatsApp
                        </a>
                    </div>

                    <div style={{ marginTop: "20px" }}>
                        <Link
                            to="/#contacto"
                            className="secondary-btn"
                        >
                            Solicitar presupuesto online
                        </Link>
                    </div>

                </div>
            </div>

            <Footer />
        </>
    );
}

export default LimpiezaAltea;