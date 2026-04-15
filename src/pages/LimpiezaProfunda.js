import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import "./legal.css";

function LimpiezaProfunda() {

useEffect(() => {
window.scrollTo(0, 0);
}, []);

return (
<>
<Navbar />

<div className="legal-page">
<div className="legal-container">

<h1>Limpieza profunda en Benidorm y Costa Blanca</h1>

<p>
En <strong>Limpiezas Costa Blanca</strong> realizamos servicios de 
<strong>limpieza profunda en Benidorm y alrededores</strong>, ideales 
para viviendas que requieren una limpieza más detallada y completa.
</p>

<p>
Este servicio está pensado para eliminar suciedad acumulada, grasa, polvo 
y zonas difíciles, dejando la vivienda completamente renovada.
</p>

<h2>Incluye limpieza profunda de</h2>

<ul>
<li>Cocina completa y electrodomésticos</li>
<li>Baños con desinfección total</li>
<li>Azulejos y juntas</li>
<li>Ventanas y cristales</li>
<li>Puertas y marcos</li>
<li>Armarios interiores</li>
<li>Zonas difíciles de acceso</li>
</ul>

<h2>Recomendado para</h2>

<ul>
<li>Cambio de inquilinos</li>
<li>Inicio de temporada</li>
<li>Después de reformas</li>
<li>Viviendas cerradas</li>
</ul>

<p>
Garantizamos resultados visibles desde el primer momento con una 
limpieza profesional y detallada.
</p>

</div>
</div>

<Footer />
</>
);
}

export default LimpiezaProfunda;