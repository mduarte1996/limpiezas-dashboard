import React, { useState, useEffect } from "react";
import "./Home.css";
import { createService } from "../services/api";
import Navbar from "../components/Navbar";
import emailjs from "emailjs-com";
import jsPDF from "jspdf";
import { FaInstagram, FaTiktok, FaFacebookF } from "react-icons/fa";
import { getReviews, createReview, deleteReview } from "../services/api";
import { Link } from "react-router-dom";


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

    const handleRating = (value) => {
        setNewReview({ ...newReview, rating: value });
    };

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
    const [selectedService, setSelectedService] = useState(null);
    const [reviews, setReviews] = useState([]);

    const [newReview, setNewReview] = useState({
        name: "",
        message: "",
        rating: 5
    });

    const handleSelectService = (service) => {
        setFormData({
            ...formData,
            service_type: service
        });

        setSelectedService(null);

        setTimeout(() => {
            document.getElementById("contacto").scrollIntoView({
                behavior: "smooth"
            });
        }, 200);
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (newReview.message.length < 10) {
            alert("La opinión debe tener al menos 10 caracteres");
            return;
        }

        if (newReview.name.length < 2) {
            alert("Nombre inválido");
            return;
        }

        if (newReview.message.includes("http")) {
            alert("No se permiten enlaces");
            return;
        }

        try {
            await createReview(newReview);

            // limpiar formulario
            setNewReview({
                name: "",
                message: "",
                rating: 5
            });

            // recargar reviews
            const data = await getReviews();
            setReviews(data);

        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteReview = async (id) => {
        await deleteReview(id);

        const data = await getReviews();
        setReviews(data);
    };

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                setSelectedService(null);
            }
        };

        window.addEventListener("keydown", handleEsc);

        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, []);

    useEffect(() => {
        if (selectedService) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [selectedService]);

    useEffect(() => {
        if (selectedService) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [selectedService]);

    useEffect(() => {
        const loadReviews = async () => {
            const data = await getReviews();
            setReviews(data);
        };

        loadReviews();
    }, []);

    return (
        <div className="home">

            {/* NAVBAR */}
            <Navbar />
            <div className="hero-video" id="inicio">

                <video autoPlay loop muted playsInline className="video-bg">
                    <source src="/videolcb.mp4" type="video/mp4" />
                </video>

                <div className="overlay">
                    <h1>Profesionalismo que cuida cada detalle</h1>
                    <p>Servicios de limpieza profesionales en Benidorm y alrededores</p>

                    <a href="#contacto" className="hero-btn">
                        Solicitar presupuesto
                    </a>
                </div>

            </div>
            <section className="about-section" id="sobre">

                <div className="about-container">

                    {/* TEXTO */}
                    <div className="about-text">
                        <h2>Sobre nosotros</h2>

                        <p>
                            En <strong>Limpiezas Costa Blanca</strong> ofrecemos servicios profesionales
                            de limpieza en Benidorm y alrededores, adaptándonos a las necesidades de cada cliente.
                        </p>

                        <p>
                            Nos destacamos por la <strong>puntualidad, confianza y atención al detalle</strong>,
                            garantizando siempre resultados impecables en cada servicio.
                        </p>

                        <p>
                            Trabajamos con viviendas, pisos turísticos y limpiezas profundas,
                            aportando tranquilidad y calidad en cada espacio.
                        </p>

                        <div className="about-features">
                            <span>✔ Profesionalismo</span>
                            <span>✔ Confianza</span>
                            <span>✔ Resultados impecables</span>
                        </div>
                    </div>

                    {/* IMAGEN */}
                    <div className="about-image">
                        <img src="/imagen-lcb.png" alt="Equipo de limpieza profesional" />
                    </div>

                </div>

            </section>

            {/* SERVICIOS */}
            <section className="services" id="servicios">
                <h2>Nuestros Servicios</h2>
                <p>Ofrecemos soluciones de limpieza adaptadas a cada necesidad, combinando
                    profesionalismo, eficiencia y atención al detalle en cada servicio.</p>

                <div className="cards">

                    <div className="card" onClick={() => setSelectedService("vivienda")}>
                        <h3>🏠 Limpieza de viviendas</h3>
                        <p>Servicio completo para casas y apartamentos.</p>
                    </div>

                    <div className="card" onClick={() => setSelectedService("turistico")}>
                        <h3>🏖 Pisos turísticos</h3>
                        <p>Servicio especializado para alquileres vacacionales.</p>
                    </div>

                    <div className="card" onClick={() => setSelectedService("profunda")}>
                        <h3>✨ Limpieza profunda</h3>
                        <p>Eliminamos suciedad difícil y acumulada.</p>
                    </div>

                    <div className="card" onClick={() => setSelectedService("obra")}>
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

            <section className="reviews" id="reviews">

                <h2 className="section-title">Lo que dicen nuestros clientes</h2>
                <p className="section-subtitle">Opiniones reales de nuestros clientes</p>

                {/* REVIEWS DINÁMICAS */}
                <div className="reviews-container">

                    {reviews.length === 0 ? (
                        <p>Aún no hay opiniones. Sé el primero en comentar ⭐</p>
                    ) : (
                        reviews.map((rev) => (
                            <div key={rev.id} className="review-card">
                                <p>"{rev.message}"</p>
                                <span>
                                    {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)} - {rev.name}
                                </span>
                                {/* BOTÓN ADMIN */}
                                <button
                                    className="delete-review"
                                    onClick={() => handleDeleteReview(rev.id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))
                    )}

                </div>

                {/* FORMULARIO */}
                <form onSubmit={handleReviewSubmit} className="review-form">

                    <h3>Déjanos tu opinión</h3>

                    <input
                        type="text"
                        placeholder="Tu nombre"
                        value={newReview.name}
                        onChange={(e) =>
                            setNewReview({ ...newReview, name: e.target.value })
                        }
                        required
                    />

                    <textarea
                        placeholder="Escribe tu experiencia..."
                        value={newReview.message}
                        onChange={(e) =>
                            setNewReview({ ...newReview, message: e.target.value })
                        }
                        required
                    />

                    <button type="submit" className="primary-btn">
                        Enviar opinión
                    </button>
                    <div className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={star <= newReview.rating ? "star active" : "star"}
                                onClick={() => handleRating(star)}
                            >
                                ★
                            </span>
                        ))}
                    </div>

                </form>

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
            <section className="form-section" id="contacto">
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
                    <label className="legal-check">
                        <input type="checkbox" required />
                        Acepto la <a href="/privacidad">Política de privacidad</a>
                    </label>

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
            <footer className="footer" id="contacto">

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
                        <Link to="/Privacidad">Política de privacidad</Link>
                        <Link to="/Cookies">Cookies</Link>
                    </div>
                </div>

            </footer>
            {selectedService && (
                <div className="modal-overlay" onClick={() => setSelectedService(null)}>

                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>

                        <button className="modal-close" onClick={() => setSelectedService(null)}>
                            ✖
                        </button>

                        {selectedService === "vivienda" && (
                            <div className="modal-body">

                                <div className="modal-text">
                                    <h2>Limpieza de viviendas</h2>

                                    <p>
                                        Servicio profesional para mantener tu hogar impecable,
                                        con atención al detalle y productos de alta calidad.
                                    </p>
                                    <p><strong>Incluye:</strong></p>

                                    <ul>
                                        <li>✔ Limpieza de cocina y baños</li>
                                        <li>✔ Aspirado y fregado</li>
                                        <li>✔ Eliminación de polvo</li>
                                        <li>✔ Limpieza de superficies</li>
                                        <li>✔ Cambio de ropa de cama</li>
                                    </ul>

                                    <p><strong>💰 16€/hora + IVA</strong></p>

                                    <button
                                        className="primary-btn"
                                        onClick={() => handleSelectService("vivienda")}
                                    >
                                        Reservar limpieza de vivienda
                                    </button>
                                </div>

                                <div className="modal-image">
                                    <img src="/limpieza-vivienda.jpg" alt="Servicio vivienda" />
                                </div>

                            </div>
                        )}
                        {selectedService === "turistico" && (
                            <div className="modal-body">

                                <div className="modal-text">
                                    <h2>Limpieza de pisos turísticos</h2>

                                    <p>
                                        Preparamos tu vivienda para cada huésped como si fuera un hotel,
                                        cuidando cada detalle para ofrecer una experiencia impecable desde el primer momento.
                                    </p>

                                    <p>
                                        Sabemos que en el alquiler vacacional la limpieza no es solo higiene,
                                        es reputación, valoraciones y más reservas.
                                    </p>

                                    <ul>
                                        <li>✔ Limpieza completa tras cada salida</li>
                                        <li>✔ Cambio de sábanas y toallas</li>
                                        <li>✔ Preparación tipo hotel</li>
                                        <li>✔ Reposición de básicos</li>
                                        <li>✔ Revisión general del inmueble</li>
                                    </ul>

                                    <p className="price">
                                        💰 17€/hora + IVA
                                        <br />
                                        <span>Servicio de lavandería opcional +10€</span>
                                    </p>

                                    {/* HIGHLIGHT DENTRO DEL TEXTO */}
                                    <div className="modal-highlight">
                                        <p>⭐ Mejora tus valoraciones en Airbnb y Booking</p>
                                        <p>🧼 Servicio rápido entre check-out y check-in</p>
                                        <p>📸 Posibilidad de reporte del estado del piso</p>
                                    </div>

                                    <button
                                        className="primary-btn"
                                        onClick={() => handleSelectService("turistico")}
                                    >
                                        Reservar limpieza turística
                                    </button>

                                </div>

                                {/* IMAGEN */}
                                <div className="modal-image">
                                    <img src="/limpieza-turistica.jpg" alt="Pisos turísticos" />
                                </div>

                            </div>
                        )}
                        {selectedService === "profunda" && (
                            <div className="modal-body">

                                <div className="modal-text">
                                    <h2>Limpieza profunda</h2>

                                    <p>
                                        Eliminamos suciedad acumulada en profundidad,
                                        ideal para cambios de temporada o viviendas muy usadas.
                                    </p>

                                    <ul>
                                        <li>✔ Desinfección completa</li>
                                        <li>✔ Limpieza de zonas difíciles</li>
                                        <li>✔ Cocina y baño a fondo</li>
                                        <li>✔ Eliminación de grasa y cal</li>
                                    </ul>

                                    <p><strong>💰 18€/hora + IVA</strong></p>

                                    <button
                                        className="primary-btn"
                                        onClick={() => handleSelectService("profunda")}
                                    >
                                        Reservar limpieza profunda
                                    </button>
                                </div>

                                <div className="modal-image">
                                    <img src="/profunda.jpg" alt="Limpieza profunda" />
                                </div>

                            </div>
                        )}
                        {selectedService === "obra" && (
                            <div className="modal-body">

                                <div className="modal-text">
                                    <h2>Limpieza fin de obra</h2>

                                    <p>
                                        Dejamos tu espacio listo para entrar a vivir tras reformas o construcción.
                                    </p>

                                    <ul>
                                        <li>✔ Eliminación de polvo de obra</li>
                                        <li>✔ Limpieza de restos de pintura y materiales</li>
                                        <li>✔ Cristales y superficies a fondo</li>
                                        <li>✔ Aspirado industrial</li>
                                    </ul>

                                    <p><strong>💰 20€/hora + IVA</strong></p>

                                    <button
                                        className="primary-btn"
                                        onClick={() => handleSelectService("obra")}
                                    >
                                        Reservar limpieza de obra
                                    </button>
                                </div>

                                <div className="modal-image">
                                    <img src="/post-obra.jpg" alt="Final de obra" />
                                </div>

                            </div>
                        )}

                    </div>
                </div>
            )}
            <a
                href="https://wa.me/34611009814"
                className="whatsapp-float"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src="/whatsapp-icon-white.png" alt="WhatsApp" />
            </a>
            {!localStorage.getItem("cookiesAccepted") && (
                <div className="cookie-banner">
                    <p>
                        Utilizamos cookies para mejorar tu experiencia. Al continuar aceptas nuestra{" "}
                        <a href="/cookies">Política de cookies</a>.
                    </p>

                    <button
                        onClick={() => {
                            localStorage.setItem("cookiesAccepted", "true");
                            window.location.reload();
                        }}
                    >
                        Aceptar
                    </button>
                </div>
            )}

        </div>
    );
}

export default Home;