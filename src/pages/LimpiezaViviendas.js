import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import "./legal.css";

function LimpiezaViviendas() {

useEffect(() => {
window.scrollTo(0, 0);
}, []);

return (
<>
<Navbar />

<div className="legal-page">
<div className="legal-container">

<h1>Limpieza de viviendas en Benidorm y alrededores</h1>

<p>
En <strong>Limpiezas Costa Blanca</strong> ofrecemos servicio profesional de 
<strong> limpieza de viviendas en Benidorm, Altea, La Nucía, Albir, 
Villajoyosa y Cala de Finestrat</strong>, adaptándonos a las necesidades 
de cada cliente.
</p>

<p>
Realizamos limpiezas regulares, mantenimiento semanal, limpieza puntual 
y preparación de viviendas, garantizando espacios higiénicos, ordenados 
y listos para disfrutar.
</p>

<h2>¿Qué incluye el servicio?</h2>

<ul>
<li>Limpieza completa de cocina</li>
<li>Limpieza de baños y desinfección</li>
<li>Aspirado y fregado de suelos</li>
<li>Limpieza de polvo en muebles</li>
<li>Limpieza de cristales interiores</li>
<li>Organización general del hogar</li>
</ul>

<h2>Ideal para</h2>

<ul>
<li>Viviendas habituales</li>
<li>Segunda residencia</li>
<li>Propietarios que alquilan</li>
<li>Limpieza semanal o mensual</li>
</ul>

<p>
Trabajamos con puntualidad, confianza y atención al detalle, ofreciendo 
un servicio profesional adaptado a cada vivienda.
</p>

</div>
</div>

<Footer />
</>
);
}

export default LimpiezaViviendas;