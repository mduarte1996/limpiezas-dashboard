import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/legal.css";

function PisosTuristicos() {
  return (
    <>
      <Navbar />

      <section className="legal-page">
        <div className="legal-container">

          <h1>Limpieza de Pisos Turísticos en Benidorm</h1>

          <p>
          En Limpiezas Costa Blanca somos especialistas en limpieza de pisos 
          turísticos en Benidorm y alrededores. Ofrecemos servicio profesional 
          para apartamentos de Airbnb, Booking y alquiler vacacional, 
          garantizando una presentación impecable para cada huésped.
          </p>

          <h2>¿Qué incluye la limpieza de pisos turísticos?</h2>

          <ul>
            <li>Limpieza completa del apartamento</li>
            <li>Limpieza de cocina y electrodomésticos</li>
            <li>Limpieza y desinfección de baños</li>
            <li>Revisión general del alojamiento</li>
            <li>Preparación para check-in</li>
            <li>Cambio de sábanas</li>
            <li>Servicio de lavandería (opcional)</li>
            <li>Reposición de amenities</li>
          </ul>

          <h2>Servicio ideal para</h2>

          <ul>
            <li>Propietarios de Airbnb</li>
            <li>Apartamentos turísticos</li>
            <li>Gestores de alquiler vacacional</li>
            <li>Cambios de huéspedes</li>
          </ul>

          <h2>Zonas donde trabajamos</h2>

          <p>
          Ofrecemos limpieza de pisos turísticos en Benidorm, Altea, 
          Albir, Villajoyosa, La Nucía, Finestrat, Cala de Finestrat 
          y alrededores de la Costa Blanca.
          </p>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default PisosTuristicos;