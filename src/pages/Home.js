import React, { useState } from "react";
import "./Home.css";
import { createService } from "../services/api";
import Navbar from "../components/Navbar";
import emailjs from "emailjs-com";
import jsPDF from "jspdf";

function Home() {

    const [formData, setFormData] = useState({
        client_name: "",
        phone: "",
        address: "",
        service_type: "",
        scheduled_date: "",
        hours: 2,
        urgent: false
    });

    const [totalPrice, setTotalPrice] = useState({
        subtotal: 0,
        iva: 0,
        total: 0
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        const newValue = type === "checkbox" ? checked : value;

        const updatedForm = {
            ...formData,
            [name]: newValue
        };

        setFormData(updatedForm);

        calculatePrice(updatedForm);
    };

    const calculatePrice = (data) => {
        let pricePerHour = 0;

        if (data.service_type === "vivienda") pricePerHour = 16;
        if (data.service_type === "turistico") pricePerHour = 17;
        if (data.service_type === "profunda") pricePerHour = 20;
        if (data.service_type === "obra") pricePerHour = 25;

        let subtotal = pricePerHour * (data.hours || 0);

        if (data.urgent) {
            subtotal += 15;
        }

        const iva = subtotal * 0.21;
        const total = subtotal + iva;

        setTotalPrice({
            subtotal,
            iva,
            total
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            //  Guardar en base de datos
            await createService({
                ...formData,
                price: totalPrice.total
            });

            //  Enviar email automático
            await emailjs.send(
                "service_fj7ukak",
                "template_llc45cn",
                {
                    name: formData.client_name,
                    phone: formData.phone,
                    service: formData.service_type,
                    address: formData.address,
                    date: formData.scheduled_date,
                    hours: formData.hours,
                    subtotal: totalPrice.subtotal.toFixed(2),
                    iva: totalPrice.iva.toFixed(2),
                    total: totalPrice.total.toFixed(2)
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
                scheduled_date: "",
                hours: 2,
                urgent: false
            });

            setTotalPrice({
                subtotal: 0,
                iva: 0,
                total: 0
            });

        } catch (error) {
            console.error(error);
            alert("❌ Error al enviar");
        }
    };

    const handleWhatsAppQuote = () => {
        const phone = "34611009814";

        const message = `
Hola, quiero confirmar este servicio:

🧹 Servicio: ${formData.service_type}
📍 Dirección: ${formData.address}
📅 Fecha: ${formData.scheduled_date}
⏱ Horas: ${formData.hours}

💰 Total: ${totalPrice.total?.toFixed(2)} €

Gracias!
    `;

        window.open(
            `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
            "_blank"
        );
    };
    const generatePDF = () => {
        const doc = new jsPDF();

        doc.text("Limpiezas Costa Blanca", 20, 20);

        doc.text(`Cliente: ${formData.client_name}`, 20, 40);
        doc.text(`Servicio: ${formData.service_type}`, 20, 50);
        doc.text(`Horas: ${formData.hours}`, 20, 60);

        doc.text(`Subtotal: ${totalPrice.subtotal} €`, 20, 80);
        doc.text(`IVA: ${totalPrice.iva} €`, 20, 90);
        doc.text(`Total: ${totalPrice.total} €`, 20, 100);

        doc.save("presupuesto.pdf");
    };

    return (
        <div className="home">

            {/* NAVBAR */}
            <Navbar />
            <div className="hero-video">

                <video autoPlay loop muted playsInline className="video-bg">
                    <source src="/videolcb.mp4" type="video/mp4" />
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

                        <div className="img-box">
                            <img
                                src="https://i.pinimg.com/736x/b4/cb/74/b4cb745032c177580975516819de7f92.jpg"
                                alt="Limpieza profesional de cocina en Benidorm"
                            />
                        </div>

                        <div className="img-box">
                            <img
                                src="https://i.pinimg.com/736x/fc/3f/12/fc3f12dfee374114b959872e98bedd29.jpg"
                                alt="Limpieza de salón moderno y ordenado"
                            />
                        </div>

                        <div className="img-box">
                            <img
                                src="https://i.pinimg.com/1200x/2d/08/22/2d08228dbfe374ac296bdca2c5760273.jpg"
                                alt="Baño limpio y desinfectado profesionalmente"
                            />
                        </div>

                        <div className="img-box">
                            <img
                                src="https://i.pinimg.com/1200x/99/21/2e/99212e1aba0610a0954db70768d8d343.jpg"
                                alt="Servicio de limpieza profunda en vivienda"
                            />
                        </div>

                        <div className="img-box">
                            <img
                                src="https://i.pinimg.com/1200x/ee/a1/0e/eea10e34f4e8b689da8599d6bdb081a0.jpg"
                                alt="Limpieza de apartamentos turísticos en Benidorm"
                            />
                        </div>

                        <div className="img-box">
                            <img
                                src="https://i.pinimg.com/736x/32/69/6c/32696c098d7af7d061550ad843538153.jpg"
                                alt="Resultados de limpieza profesional en baño"
                            />
                        </div>

                    </div>

                </div>
            </section>
            <section className="reviews">

                <h2 className="section-title">Lo que dicen nuestros clientes</h2>
                <p className="section-subtitle">Resultados reales, clientes satisfechos</p>

                <div className="reviews-container">

                    <div className="review-card">
                        <p>"Excelente servicio, muy puntuales y profesionales."</p>
                        <span>⭐⭐⭐⭐⭐ - María</span>
                    </div>

                    <div className="review-card">
                        <p>"Dejaron mi piso turístico impecable."</p>
                        <span>⭐⭐⭐⭐⭐ - Carlos</span>
                    </div>

                    <div className="review-card">
                        <p>"Muy recomendados, repetiré sin duda."</p>
                        <span>⭐⭐⭐⭐⭐ - Laura</span>
                    </div>

                </div>

                {/* FORM OPINIÓN */}
                <div className="review-form">
                    <h3>Déjanos tu opinión</h3>

                    <input type="text" placeholder="Tu nombre" />
                    <textarea placeholder="Escribe tu experiencia..." />

                    <button className="primary-btn">Enviar opinión</button>
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
                        <option value="vivienda">
                            Limpieza de vivienda (16€/h + IVA → 19,36€/h)
                        </option>
                        <option value="turistico">
                            Piso turístico (17€/h + IVA → 20,57€/h)
                        </option>
                        <option value="profunda">
                            Limpieza profunda (18€/h + IVA → 21,78€/h)
                        </option>
                        <option value="obra">
                            Final de obra (20€/h + IVA → 24,20€/h)
                        </option>
                    </select>
                    {/* HORAS */}
                    <select
                        name="hours"
                        value={formData.hours}
                        onChange={handleChange}
                    >
                        <option value={2}>2 horas</option>
                        <option value={3}>3 horas</option>
                        <option value={4}>4 horas</option>
                        <option value={5}>5 horas</option>
                    </select>

                    {/* URGENTE */}
                    <label style={{ marginTop: "10px" }}>
                        <input
                            type="checkbox"
                            name="urgent"
                            checked={formData.urgent}
                            onChange={handleChange}
                        />
                        Limpieza urgente (+10€) por gastos de desplazamiento y urgencia en la gestión.
                    </label>

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
                {totalPrice.total > 0 && (
                    <>
                        <div className="price-box">

                            <h3>💰 Presupuesto estimado</h3>

                            <div className="price-line">
                                <span>Subtotal:</span>
                                <span>{totalPrice.subtotal.toFixed(2)} €</span>
                            </div>

                            <div className="price-line">
                                <span>IVA (21%):</span>
                                <span>{totalPrice.iva.toFixed(2)} €</span>
                            </div>

                            {formData.urgent && (
                                <div className="price-line">
                                    <span>Urgente:</span>
                                    <span>+10€</span>
                                </div>
                            )}

                            <hr />

                            <div className="price-total">
                                <strong>Total:</strong>
                                <strong>{totalPrice.total.toFixed(2)} €</strong>
                            </div>

                        </div>

                        {/* 👇 BOTÓN AQUÍ */}
                        <button
                            className="whatsapp-confirm-btn"
                            onClick={handleWhatsAppQuote}
                        >
                            ✅ Confirmar por WhatsApp
                        </button>
                        <button
                            onClick={generatePDF}
                            className="primary-btn"
                            style={{ marginTop: "10px" }}
                        >
                            Descargar presupuesto PDF
                        </button>
                    </>
                )}
                <div className="pricing-info">
                    <h3>💶 Tarifas orientativas</h3>

                    <p>✔ Limpieza de viviendas: <strong>16€/hora + IVA</strong></p>
                    <p>✔ Pisos turísticos: <strong>17€/hora + IVA</strong></p>
                    <p>✔ Limpieza profunda: <strong>18€/hora + IVA</strong></p>
                    <p>✔ Final de obra: <strong>20€/hora + IVA</strong></p>

                    <small>*El precio final puede variar según tamaño y estado del espacio.</small>
                </div>

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