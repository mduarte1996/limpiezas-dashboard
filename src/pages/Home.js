import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { useState } from "react";
import { createService } from "../services/api";

function Home() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        client_name: "",
        phone: "",
        address: "",
        service_type: "",
        scheduled_date: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createService(formData);
            alert("✅ Solicitud enviada correctamente");

            setFormData({
                client_name: "",
                phone: "",
                address: "",
                service_type: "",
                scheduled_date: ""
            });

        } catch (error) {
            alert("❌ Error al enviar");
            console.error(error);
        }
    };

    return (
        <div className="home">

            {/* HERO */}
            <div className="hero">
                <div className="overlay">
                    <h1>Limpiezas Costa Blanca</h1>
                    <p>Servicios profesionales de limpieza en Benidorm y alrededores</p>

                    <button onClick={() => navigate("/login")}>
                        Área de clientes
                    </button>

                    <button className="primary-btn" onClick={() => navigate("/#form")}>
                        Solicitar presupuesto
                    </button>
                </div>
            </div>

            {/* SERVICIOS */}
            <section className="services">
                <h2>Nuestros Servicios</h2>

                <div className="cards">

                    <div className="card">
                        <h3>🏠 Limpieza de viviendas</h3>
                        <p>Servicio completo para casas y apartamentos.</p>
                    </div>

                    <div className="card">
                        <h3>🏖 Pisos turísticos</h3>
                        <p>Servicio especializado para alquileres vacacionales.</p>
                    </div>

                    <div className="card">
                        <h3>✨ Limpieza profunda</h3>
                        <p>Eliminamos suciedad difícil y acumulada.</p>
                    </div>

                    <div className="card">
                        <h3>🧱 Final de obra</h3>
                        <p>Dejamos tu espacio listo para usar.</p>
                    </div>

                </div>
            </section>

            {/* CTA */}
            <section className="cta">
                <h2>¿Necesitas limpieza urgente?</h2>
                <p>Contáctanos y te damos presupuesto en minutos</p>

                <button className="primary-btn">
                    Contactar ahora
                </button>
            </section>

            <section className="form-section" id="form">
                <h2>Solicita tu presupuesto</h2>

                <form onSubmit={handleSubmit} className="form">

                    <input
                        name="client_name"
                        placeholder="Nombre"
                        value={formData.client_name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="phone"
                        placeholder="Teléfono"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="address"
                        placeholder="Dirección"
                        value={formData.address}
                        onChange={handleChange}
                    />

                    <input
                        name="service_type"
                        placeholder="Tipo de servicio"
                        value={formData.service_type}
                        onChange={handleChange}
                    />

                    <input
                        type="date"
                        name="scheduled_date"
                        value={formData.scheduled_date}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" className="primary-btn">
                        Enviar solicitud
                    </button>

                </form>
            </section>
            <button
                className="whatsapp-btn"
                onClick={() => {
                    const message = "Hola, quiero solicitar un servicio de limpieza";
                    const phone = "34611009814"; // TU NUMERO CON PREFIJO 34

                    window.open(
                        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
                        "_blank"
                    );
                }}
            >
                📲 Escríbenos por WhatsApp
            </button>

        </div>
    );
}

export default Home;