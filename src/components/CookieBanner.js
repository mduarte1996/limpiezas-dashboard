import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CookieBanner.css";
import { loadAnalytics } from "../utils/analytics";

function CookieBanner() {

const [visible, setVisible] = useState(false);

useEffect(() => {
const consent = localStorage.getItem("cookie-consent");

if (!consent) {
setVisible(true);
}

if (consent === "accepted") {
loadAnalytics();
}

}, []);

const acceptCookies = () => {
localStorage.setItem("cookie-consent", "accepted");

loadAnalytics();

setVisible(false);
};

const rejectCookies = () => {
localStorage.setItem("cookie-consent", "rejected");
setVisible(false);
};

if (!visible) return null;

return (
<div className="cookie-banner">

<div className="cookie-text">
Utilizamos cookies para mejorar tu experiencia, analizar el tráfico y cumplir con la normativa.
Puedes aceptar todas las cookies o rechazarlas. Consulta nuestra{" "}
<Link to="/cookies">política de cookies</Link>.
</div>

<div className="cookie-actions">

<button 
className="cookie-btn reject"
onClick={rejectCookies}
>
Rechazar
</button>

<button 
className="cookie-btn accept"
onClick={acceptCookies}
>
Aceptar cookies
</button>

</div>

</div>
);

}

export default CookieBanner;