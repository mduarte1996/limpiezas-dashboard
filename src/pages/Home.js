import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { createService } from "../services/api";
import Navbar from "../components/Navbar";

function Home() {
  const navigate = useNavigate();

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
      await createService(formData);
      alert("✅ Solicitud enviada correctamente");

      setFormData({
        client_name: "",
        phone: "",
        address: "",
        service_type: "",
        scheduled_date: ""
      });

      setEstimatedPrice(0);

    } catch (error) {
      alert("❌ Error al enviar");
      console.error(error);
    }
  };

  return (
    <div className="home">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <div className="hero">
        <div className="overlay">
          <h1>Limpiezas Costa Blanca</h1>
          <p>Servicios profesionales de limpieza en Benidorm y alrededores</p>

          <button onClick={() => navigate("/login")}>
            Área de clientes
          </button>

          <button
            className="primary-btn"
            onClick={() => {
              document.getElementById("form").scrollIntoView({ behavior: "smooth" });
            }}
          >
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
          📲 Escríbenos por WhatsApp
        </button>

      </section>

    </div>
  );
}

export default Home;