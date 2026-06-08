import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import "./legal.css";

function GestionTuristica() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Navbar />

            <div className="legal-page">
                <div className="legal-container">

                    <h1>
                        Gestión de alquiler turístico en Benidorm y Costa Blanca
                    </h1>

                    <p>
                        En <strong>Limpiezas Costa Blanca</strong> ofrecemos un servicio
                        profesional de <strong>gestión de alquiler turístico en Benidorm,
                        Altea, La Nucía, Finestrat, Villajoyosa y alrededores</strong>.
                    </p>

                    <p>
                        Nos encargamos de la gestión operativa de apartamentos turísticos,
                        viviendas vacacionales y alojamientos de corta estancia para que
                        los propietarios puedan maximizar su rentabilidad sin preocuparse por
                        la coordinación diaria.
                    </p>

                    <h2>¿Qué incluye nuestro servicio de gestión turística?</h2>

                    <ul>
                        <li>Coordinación de check-in y check-out</li>
                        <li>Atención y comunicación con huéspedes</li>
                        <li>Servicio de limpieza</li>
                        <li>Reposición de amenities y suministros</li>
                        <li>Control de incidencias</li>
                        <li>Servicio de lavandería</li>
                        <li>Inspección del estado del inmueble</li>
                        <li>marketing y publicación en plataformas de alquiler</li>
                    </ul>

                    <h2>Gestión integral para propietarios</h2>

                    <p>
                        Sabemos que gestionar una vivienda vacacional requiere tiempo,
                        organización y disponibilidad constante. Por eso ofrecemos un
                        servicio integral pensado para propietarios que desean delegar
                        las tareas operativas y garantizar una excelente experiencia
                        para sus huéspedes.
                    </p>

                    <p>
                        Nuestro equipo coordina cada estancia para que la vivienda esté
                        siempre preparada, limpia y lista para recibir a los visitantes.
                    </p>

                    <h2>Servicio para apartamentos turísticos y Airbnb</h2>

                    <p>
                        Trabajamos con propietarios de apartamentos turísticos,
                        viviendas vacacionales y alojamientos anunciados en plataformas
                        como Airbnb, Booking y Vrbo.
                    </p>

                    <p>
                        Nos aseguramos de que cada huésped encuentre la vivienda en
                        perfectas condiciones, contribuyendo a obtener mejores valoraciones
                        y aumentar la satisfacción de los clientes.
                    </p>

                    <h2>Ventajas de contratar una gestión turística profesional</h2>

                    <ul>
                        <li>Ahorro de tiempo para el propietario</li>
                        <li>Mayor tranquilidad y control operativo</li>
                        <li>Mejor experiencia para los huéspedes</li>
                        <li>Coordinación eficiente de limpiezas y mantenimiento</li>
                        <li>Respuesta rápida ante incidencias</li>
                        <li>Mayor calidad en cada estancia</li>
                    </ul>

                    <h2>Zonas donde trabajamos</h2>

                    <p>
                        Prestamos servicio en Benidorm, Altea, Finestrat,
                        La Nucía, Villajoyosa, Alfaz del Pi y otras zonas de la
                        Costa Blanca.
                    </p>

                    <h2>Solicita información</h2>

                    <p>
                        Si buscas una empresa de confianza para la gestión de tu
                        alquiler turístico en la Costa Blanca, estaremos encantados
                        de ayudarte. Adaptamos nuestros servicios a las necesidades
                        de cada propietario y cada vivienda.
                    </p>

                </div>
            </div>

            <Footer />
        </>
    );
}

export default GestionTuristica;