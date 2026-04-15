import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import "./legal.css";

function LimpiezaFinObra() {

useEffect(() => {
window.scrollTo(0, 0);
}, []);

return (
<>
<Navbar />

<div className="legal-page">
<div className="legal-container">

<h1>Limpieza fin de obra en Benidorm y alrededores</h1>

<p>
En <strong>Limpiezas Costa Blanca</strong> ofrecemos servicio profesional 
de <strong>limpieza fin de obra en Benidorm, Altea, La Nucía, 
Villajoyosa y alrededores</strong>.
</p>

<p>
Eliminamos polvo de obra, restos de pintura, silicona y suciedad 
generada durante reformas o construcciones.
</p>

<h2>Incluye limpieza de</h2>

<ul>
<li>Eliminación de polvo de obra</li>
<li>Limpieza de ventanas y cristales</li>
<li>Restos de pintura y silicona</li>
<li>Limpieza de suelos a fondo</li>
<li>Cocina y baños completos</li>
<li>Puertas y marcos</li>
<li>Armarios interiores</li>
</ul>

<h2>Ideal para</h2>

<ul>
<li>Viviendas recién reformadas</li>
<li>Locales comerciales</li>
<li>Pisos nuevos</li>
<li>Entrega de obra</li>
</ul>

<p>
Dejamos el espacio listo para entrar a vivir con una limpieza profesional 
y detallada.
</p>

</div>
</div>

<Footer />
</>
);
}

export default LimpiezaFinObra;