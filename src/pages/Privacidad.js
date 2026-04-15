import React from "react";
import "./legal.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Privacidad() {
    return (
        <>
            <Navbar />
            <div className="legal-page">
                <div className="legal-container">
                    <Link to="/" className="back-btn">
                        ← Volver al inicio
                    </Link>

                    <h1>Política de Privacidad</h1>

                    <h2>Responsable del tratamiento</h2>

                    <p><strong>Titular:</strong> María Fernanda Duarte Abril</p>
                    <p><strong>Nombre comercial:</strong> Limpiezas Costa Blanca</p>
                    <p><strong>Email:</strong> info@limpiezacostablanca.com</p>
                    <p><strong>Teléfono:</strong> +34 611 00 98 14</p>

                    <h2>Datos recopilados</h2>

                    <p>Podemos recopilar los siguientes datos:</p>

                    <ul>
                        <li>Nombre</li>
                        <li>Teléfono</li>
                        <li>Email</li>
                        <li>Dirección</li>
                        <li>Tipo de servicio</li>
                        <li>Mensaje del cliente</li>
                    </ul>

                    <h2>Finalidad</h2>

                    <p>Los datos se utilizan para:</p>

                    <ul>
                        <li>Gestionar solicitudes</li>
                        <li>Enviar presupuestos</li>
                        <li>Contactar con clientes</li>
                        <li>Mejorar el servicio</li>
                    </ul>

                    <h2>Conservación de datos</h2>

                    <p>
                        Los datos se conservarán durante el tiempo necesario para cumplir con
                        la finalidad para la que se recopilaron.
                    </p>

                    <h2>Derechos del usuario</h2>

                    <p>El usuario puede:</p>

                    <ul>
                        <li>Acceder a sus datos</li>
                        <li>Rectificarlos</li>
                        <li>Solicitar eliminación</li>
                        <li>Limitar su tratamiento</li>
                    </ul>

                    <p>
                        Para ejercer estos derechos escribir a:
                        info@limpiezacostablanca.com
                    </p>

                </div>
            </div>
            <Footer />
        </>
    );
}

export default Privacidad;
