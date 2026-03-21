import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">

      {/* HERO */}
      <div className="hero">
        <div className="overlay">
          <h1>Limpiezas Costa Blanca</h1>
          <p>Servicios profesionales de limpieza en Benidorm</p>

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
            <p>Preparación rápida para nuevos huéspedes.</p>
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

    </div>
  );
}

export default Home;