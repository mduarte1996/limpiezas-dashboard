import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <h2 className="logo" onClick={() => navigate("/")}>
        LCB
      </h2>

      <div className="nav-links">
        <button onClick={() => navigate("/")}>Inicio</button>
        <button onClick={() => window.location.href="#form"}>Presupuesto</button>

        <button
          className="whatsapp"
          onClick={() => {
            const phone = "346XXXXXXXX";
            const message = "Hola, quiero información sobre limpieza";
            window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`);
          }}
        >
          WhatsApp
        </button>

        <button onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Navbar;