import React, { useEffect, useState } from "react";
import "../Dashboard.css";
import CalendarView from "../components/CalendarView";
import { BASE_URL } from "../services/api";
import ServicesChart from "../components/ServicesChart";
import Calendar from "react-calendar";
import BigCalendar from "../components/BigCalendar";
import IncomeChart from "../components/IncomeChart";
import {
  CheckCircleIcon,
  ClockIcon,
  ClipboardDocumentListIcon
} from "@heroicons/react/24/solid";
import {
  getServices,
  updateServiceStatus,
  deleteService,
  createService,
  updateService
} from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [stats, setStats] = useState({
    income: 0,
    services: 0
  });

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

  // 📊 STATS
  const loadStats = async () => {
    try {
      const res = await fetch(`${BASE_URL}/stats`);
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Error cargando stats:", error);
    }
  };

  useEffect(() => {
    loadServices();
    loadStats();
  }, []);

  // 🔍 FILTRO SEGURO
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
      loadStats();

    } catch (error) {
      console.error(error);
      alert("❌ Error al guardar");
    }
  };

  // ⚙️ ACCIONES
  const completeService = async (id) => {
    try {
      await updateServiceStatus(id, "completado");
      loadServices();
      loadStats();
    } catch {
      alert("Error al completar");
    }
  };

  const removeService = async (id) => {
    try {
      await deleteService(id);
      loadServices();
      loadStats();
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

  return (
    <div className="layout">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2 className="logo-text">LCB</h2>
        <ul>
          <li>📊 Dashboard</li>
          <li>🧹 Servicios</li>
          <li>⚙ Ajustes</li>
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

        </div>

        {/* FORM */}
        <h2>Nueva solicitud</h2>

        <form onSubmit={handleSubmit} className="form">

          <input name="client_name" placeholder="Nombre" value={formData.client_name} onChange={handleChange} required />
          <input name="phone" placeholder="Teléfono" value={formData.phone} onChange={handleChange} required />
          <input name="address" placeholder="Dirección" value={formData.address} onChange={handleChange} />
          <input name="service_type" placeholder="Servicio" value={formData.service_type} onChange={handleChange} />
          <input name="price" placeholder="Precio (€)" value={formData.price} onChange={handleChange} />
          <input type="date" name="scheduled_date" value={formData.scheduled_date} onChange={handleChange} />

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

        {/* TABLA */}
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
                  <button onClick={() => startEdit(service)}>Editar</button>
                  <button onClick={() => completeService(service.id)}>Completar</button>
                  <button onClick={() => removeService(service.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* COMPONENTES PRO */}
        <BigCalendar
          services={services}
          onComplete={completeService}
          onDelete={removeService}
        />
        <ServicesChart services={services} />
        <IncomeChart services={services} />
        <Calendar />

      </div>
    </div>
  );
}

export default Dashboard;