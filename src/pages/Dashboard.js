import React, { useEffect, useState } from "react";
import "../Dashboard.css";
import { BASE_URL } from "../services/api";
import {
  CheckCircleIcon,
  ClockIcon,
  ClipboardDocumentListIcon,
  StarIcon
} from "@heroicons/react/24/solid";

import {
  getServices,
  updateServiceStatus,
  deleteService,
  createService,
  updateService,
  approveReview,
  deleteReview
} from "../services/api";

import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);


  const [formData, setFormData] = useState({
    client_name: "",
    phone: "",
    address: "",
    service_type: "",
    price: "",
    scheduled_date: ""
  });

  // 🔐 PROTEGER DASHBOARD
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // 📋 CARGAR SERVICIOS
  const loadServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error("Error cargando servicios:", error);
    }
  };

  // ⭐ CARGAR REVIEWS
  const loadReviews = async () => {
    try {
      const res = await fetch(`${BASE_URL}/reviews`);
      const data = await res.json();
      setReviews(data);
    } catch (error) {
      console.error("Error cargando reviews:", error);
    }
  };


  useEffect(() => {
    loadServices();
    loadReviews();
  }, []);

  // 🔍 FILTRO
  const filteredServices = services.filter(service =>
    (service.client_name || "").toLowerCase().includes(search.toLowerCase()) ||
    (service.phone || "").includes(search)
  );

  // 💰 INGRESOS
  const totalIncome = services
    .filter(s => s.status === "completado")
    .reduce((sum, s) => sum + Number(s.price || 0), 0);

  // 📝 FORM
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (editingId) {
        await updateService(editingId, formData);
        alert("✏️ Servicio actualizado");
        setEditingId(null);

      } else {
        await createService(formData);
        alert("✅ Servicio creado");
      }

      setFormData({
        client_name: "",
        phone: "",
        address: "",
        service_type: "",
        price: "",
        scheduled_date: ""
      });

      loadServices();

    } catch (error) {
      console.error(error);
      alert("❌ Error al guardar");
    }
  };

  // ⚙️ ACCIONES SERVICIOS

  const completeService = async (id) => {
    try {
      await updateServiceStatus(id, "completado");
      loadServices();
    } catch {
      alert("Error al completar");
    }
  };

  const removeService = async (id) => {
    try {
      await deleteService(id);
      loadServices();
    } catch {
      alert("Error al eliminar");
    }
  };

  const startEdit = (service) => {
    setFormData({
      client_name: service.client_name,
      phone: service.phone,
      address: service.address,
      service_type: service.service_type,
      price: service.price,
      scheduled_date: service.scheduled_date
    });

    setEditingId(service.id);
  };

  const moveService = async (id, newDate) => {
    try {

      await updateService(id, {
        scheduled_date: newDate.toISOString().split("T")[0]
      });

      loadServices();

    } catch (error) {
      alert("Error moviendo servicio");
    }
  };

  // ⭐ APROBAR REVIEW
  const handleApproveReview = async (id) => {
    try {

      await approveReview(id);

      alert("⭐ Review aprobada");

      loadReviews();
    } catch (error) {
      console.error(error);
      alert("Error aprobando review");
    }
  };

  // 🗑 ELIMINAR REVIEW
  const handleDeleteReview = async (id) => {
    try {

      await deleteReview(id);

      alert("🗑 Review eliminada");

      loadReviews();

    } catch (error) {
      console.error(error);
      alert("Error eliminando review");
    }
  };

  return (
    <div className="layout">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2 className="logo-text">LCB</h2>

        <ul>
          <li onClick={() => window.scrollTo(0, 0)}>📊 Dashboard</li>

          <li onClick={() =>
            document.querySelector(".table")?.scrollIntoView({ behavior: "smooth" })
          }>
            🧹 Servicios
          </li>

          <li onClick={() =>
            document.querySelector(".reviews-admin")?.scrollIntoView({ behavior: "smooth" })
          }>
            ⭐ Reviews
          </li>
        </ul>
      </div>

      <div className="main-content">

        {/* HEADER */}
        <div className="header">
          <img src="/logo-blanco.png" alt="logo" className="logo" />
          <h1 className="title">Limpiezas Costa Blanca</h1>
        </div>

        {/* STATS */}
        <div className="stats">

          <div className="stat-card">
            <ClipboardDocumentListIcon className="stat-icon" />
            <h3>{services.length}</h3>
            <p>Servicios Totales</p>
          </div>

          <div className="stat-card">
            <ClockIcon className="stat-icon" />
            <h3>{services.filter(s => s.status !== "completado").length}</h3>
            <p>Pendientes</p>
          </div>

          <div className="stat-card">
            <CheckCircleIcon className="stat-icon" />
            <h3>{services.filter(s => s.status === "completado").length}</h3>
            <p>Completados</p>
          </div>

          <div className="stat-card">
            <h3>{totalIncome} €</h3>
            <p>Ingresos</p>
          </div>

          <div className="stat-card">
            <StarIcon className="stat-icon" />
            <h3>{reviews.length}</h3>
            <p>Reviews</p>
          </div>

        </div>

        {/* FORM */}
        <h2>Nueva solicitud</h2>

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

          <input
            name="service_type"
            placeholder="Servicio"
            value={formData.service_type}
            onChange={handleChange}
          />

          <input
            name="price"
            placeholder="Precio (€)"
            value={formData.price}
            onChange={handleChange}
          />

          <input
            type="date"
            name="scheduled_date"
            value={formData.scheduled_date}
            onChange={handleChange}
          />

          <button type="submit">
            {editingId ? "Actualizar" : "Crear"}
          </button>

        </form>

        {/* BUSCADOR */}
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        {/* TABLA SERVICIOS */}
        <table className="table">

          <thead>
            <tr>
              <th>Cliente</th>
              <th>Teléfono</th>
              <th>Servicio</th>
              <th>Estado</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>

            {filteredServices.map(service => (

              <tr key={service.id}>

                <td>{service.client_name}</td>
                <td>{service.phone}</td>
                <td>{service.service_type}</td>
                <td>{service.status}</td>
                <td>{service.price} €</td>

                <td>

                  <button onClick={() => startEdit(service)}>
                    Editar
                  </button>

                  <button onClick={() => completeService(service.id)}>
                    Completar
                  </button>

                  <button onClick={() => removeService(service.id)}>
                    Eliminar
                  </button>

                  <a
                    href={`https://wa.me/34${service.phone}?text=Hola%20👋%20Gracias%20por%20confiar%20en%20Limpiezas%20Costa%20Blanca.%20Tu%20opinión%20nos%20ayuda%20muchísimo.%20⭐%20¿Podrías%20dejarnos%20una%20reseña%20rápida?%20👉%20https://www.limpiezacostablanca.com/#reviews`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <button>
                      Solicitar review
                    </button>
                  </a>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {/* ⭐ PANEL REVIEWS */}
        <div className="reviews-admin">

          <h2>⭐ Panel de Reviews</h2>

          <table className="table">

            <thead>
              <tr>
                <th>Cliente</th>
                <th>Mensaje</th>
                <th>Rating</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>

              {reviews.map(review => (

                <tr key={review.id}>

                  <td>{review.name}</td>

                  <td>{review.message}</td>

                  <td>{"⭐".repeat(review.rating)}</td>

                  <td>
                    {review.approved ? "✅ Aprobada" : "⏳ Pendiente"}
                  </td>

                  <td>

                    {!review.approved && (
                      <button
                        onClick={() => handleApproveReview(review.id)}
                      >
                        Aprobar
                      </button>
                    )}

                    <button
                      onClick={() => handleDeleteReview(review.id)}
                    >
                      Eliminar
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;