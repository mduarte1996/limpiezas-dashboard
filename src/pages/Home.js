import React, { useState } from "react";
import "./Home.css";
import { createService } from "../services/api";
import Navbar from "../components/Navbar";
import emailjs from "emailjs-com";

function Home() {

    const [formData, setFormData] = useState({
        client_name: "",
        phone: "",
        address: "",
        service_type: "",
        scheduled_date: ""
    });

    const [estimatedPrice, setEstimatedPrice] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        // PRECIO AUTOMÁTICO
        if (name === "service_type") {
            let price = 0;

            if (value === "vivienda") price = 50;
            if (value === "turistico") price = 80;
            if (value === "profunda") price = 100;
            if (value === "obra") price = 150;

            setEstimatedPrice(price);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            //  Guardar en base de datos
            await createService(formData);

            //  Enviar email automático
            await emailjs.send(
                "service_fj7ukak",
                "template_llc45cn",
                {
                    name: formData.client_name,
                    phone: formData.phone,
                    service: formData.service_type
                },
                "k_QAThMrjBr94TO3X"
            );

            alert("✅ Solicitud enviada correctamente");

            //  Limpiar formulario
            setFormData({
                client_name: "",
                phone: "",
                address: "",
                service_type: "",
                scheduled_date: ""
            });

        } catch (error) {
            console.error(error);
            alert("❌ Error al enviar");
        }
    };

    return (
        <div className="home">

            {/* NAVBAR */}
            <Navbar />
            <div className="hero-video">

                <video autoPlay loop muted playsInline className="video-bg">
                    <source src="/videolimpieza.mp4" type="video/mp4" />
                </video>

                <div className="overlay">
                    <h1>Profesionalismo que cuida cada detalle</h1>
                    <p>Servicios de limpieza profesionales en Benidorm y alrededores</p>

                    <a href="#form" className="hero-btn">
                        Solicitar presupuesto
                    </a>
                </div>

            </div>

            {/* <div className="hero">

                <div className="hero-text">
                    <h1>Profesionalismo que cuida cada detalle</h1>

                    <p>
                        Empresa de limpieza profesional en Benidorm especializada en viviendas,
                        pisos turísticos y limpieza profunda.
                    </p>

                    <button className="primary-btn">
                        Solicitar presupuesto
                    </button>
                </div>

                <div className="hero-image">
                    <img src="/cleaning-hero.jpg" alt="limpieza profesional" />
                </div>

            </div> */}

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
                        <p>Servicio especializado para alquileres vacacionales, check-in y check-out.</p>
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

            <section className="gallery">
                <h2 className="gallery-title">
                    Resultados que hablan por nosotros ✨
                </h2>

                <p className="gallery-subtitle">
                    Mira cómo transformamos cada espacio con nuestro servicio profesional
                </p>

                <div className="carousel">

                    <div className="carousel-track">
                        {/* DUPLICAMOS IMÁGENES PARA EFECTO INFINITO */}
                        <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952" />
                        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c" />
                        <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a" />

                        <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952" />
                        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c" />
                        <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a" />
                    </div>

                </div>
            </section>
            <section className="reviews">
                <h2>Opiniones de nuestros clientes</h2>

                <div className="reviews-container">

                    <div className="review">
                        <p>"Excelente servicio, muy puntuales y profesionales."</p>
                        <span>⭐⭐⭐⭐⭐ - María</span>
                    </div>

                    <div className="review">
                        <p>"Dejaron mi piso turístico impecable."</p>
                        <span>⭐⭐⭐⭐⭐ - Carlos</span>
                    </div>

                    <div className="review">
                        <p>"Muy recomendados, repetiré sin duda."</p>
                        <span>⭐⭐⭐⭐⭐ - Laura</span>
                    </div>

                </div>
            </section>

            {/* CTA */}
            <section className="cta">
                <h2>¿Necesitas limpieza urgente?</h2>
                <p>Contáctanos y te damos presupuesto en minutos</p>

                <button
                    className="primary-btn"
                    onClick={() => {
                        const phone = "34611009814";
                        const message = "Hola, necesito un servicio de limpieza urgente";
                        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`);
                    }}
                >
                    Contactar ahora
                </button>
            </section>

            {/* FORMULARIO */}
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

                    {/* SELECT (IMPORTANTE) */}
                    <select
                        name="service_type"
                        value={formData.service_type}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona servicio</option>
                        <option value="vivienda">Limpieza de vivienda</option>
                        <option value="turistico">Piso turístico</option>
                        <option value="profunda">Limpieza profunda</option>
                        <option value="obra">Final de obra</option>
                    </select>

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

                {/* PRECIO ESTIMADO */}
                {estimatedPrice > 0 && (
                    <p style={{ fontWeight: "bold", marginTop: "10px" }}>
                        Precio estimado: {estimatedPrice} €
                    </p>
                )}

                {/* WHATSAPP */}
                <button
                    className="whatsapp-btn"
                    onClick={() => {
                        const message = "Hola, quiero solicitar un servicio de limpieza";
                        const phone = "34611009814";

                        window.open(
                            `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
                            "_blank"
                        );
                    }}
                >
                    Escríbenos por WhatsApp
                </button>

            </section>

        </div>
    );
}

export default Home;