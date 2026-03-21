import React, { useEffect, useState } from "react";
import "../Dashboard.css";
import CalendarView from "../components/CalendarView";
import ServicesChart from "../components/ServicesChart";
import IncomeChart from "../components/IncomeChart";
import { CheckCircleIcon, ClockIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/solid";
import { getServices, updateServiceStatus, deleteService, createService, updateService } from "../services/api";

console.log("ENTRANDO AL DASHBOARD");

function Dashboard() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const filteredServices = services.filter(service =>
    service.client_name.toLowerCase().includes(search.toLowerCase()) ||
    service.phone.includes(search)
  );
  const [formData, setFormData] = useState({
    client_name: "",
    phone: "",
    address: "",
    service_type: "",
    price: "",
    scheduled_date: ""
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await updateService(editingId, formData);
      alert("✏️ Servicio actualizado");
      setEditingId(null);
    } else {
      await createService(formData);
      alert("✅ Servicio creado correctamente");
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
  };

  const loadServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error("Error cargando servicios:", error);
    }
  };

  const completeService = async (id) => {
    await updateServiceStatus(id, "completado");
    loadServices();
  };

  const removeService = async (id) => {
    await deleteService(id);
    loadServices();
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

  const totalIncome = services
    .filter(s => s.status === "completado")
    .reduce((sum, s) => sum + Number(s.price || 0), 0);

  useEffect(() => {
    loadServices();
  }, []);

  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
  }


  return (
    <div className="layout">

      <div className="sidebar">
        <h2 className="logo-text">LCB</h2>

        <ul>
          <li>📊 Dashboard</li>
          <li>🧹 Servicios</li>
          <li>⚙ Ajustes</li>
        </ul>
      </div>

      <div className="main-content">

        <div className="header">
          <img
            src="/logo-blanco.png"
            alt="logo Limpiezas Costa Blanca"
            className="logo"
          />
          <h1 className="title">Limpiezas Costa Blanca</h1>
        </div>

        {/* AQUÍ VAN TUS STATS */}
        {/* AQUÍ VA TU FORMULARIO */}
        {/* AQUÍ VA TU TABLA */}

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
            <p>Ingresos Totales</p>
          </div>

        </div>

        <h2 style={{ color: "#1e3a8a" }}>
          Nueva solicitud
        </h2>

        <form onSubmit={handleSubmit} className="form">

          <input
            name="client_name"
            placeholder="Nombre del cliente"
            value={formData.client_name}
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Teléfono"
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            name="address"
            placeholder="Dirección"
            value={formData.address}
            onChange={handleChange}
          />

          <input
            name="service_type"
            placeholder="Tipo de servicio"
            value={formData.service_type}
            onChange={handleChange}
          />

          <input
            name="price"
            placeholder="Precio del servicio (€)"
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
            {editingId ? "Actualizar servicio" : "Crear servicio"}
          </button>

        </form>

        <input
          type="text"
          placeholder="Buscar cliente o teléfono..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <table className="table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Servicio</th>
              <th>Estado</th>
              <th>Acción</th>
              <th>Precio</th>
            </tr>
          </thead>

          <tbody>
            {filteredServices.map((service) => (
              <tr key={service.id}>
                <td data-label="ID">{service.id}</td>
                <td data-label="Cliente">{service.client_name}</td>
                <td data-label="Teléfono">{service.phone}</td>
                <td data-label="Dirección">{service.address}</td>
                <td data-label="Servicio">{service.service_type}</td>

                <td data-label="Estado">
                  <span className={`status ${service.status}`}>
                    {service.status}
                  </span>
                </td>

                <td data-label="Precio">{service.price} €</td>

                <td data-label="Acciones">
                  <button
                    className="action-btn"
                    onClick={() => startEdit(service)}
                  >
                    Editar
                  </button>

                  <button
                    className="action-btn"
                    onClick={() => completeService(service.id)}
                  >
                    Completar
                  </button>

                  <button
                    className="action-btn delete-btn"
                    onClick={() => removeService(service.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

        <CalendarView services={services} />
        <ServicesChart services={services} />
        <IncomeChart services={services} />


      </div>

    </div>
  );
}

export default Dashboard;