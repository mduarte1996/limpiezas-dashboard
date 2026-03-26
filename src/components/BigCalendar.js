import {
  Calendar,
  dateFnsLocalizer
} from "react-big-calendar";

import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

import { format, parse, startOfWeek, getDay } from "date-fns";
import es from "date-fns/locale/es";
import { useState } from "react";

const locales = { es };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

const DnDCalendar = withDragAndDrop(Calendar);

function BigCalendar({ services, onComplete, onDelete, onMove }) {

  const [selectedService, setSelectedService] = useState(null);

  // 🎨 COLORES POR ESTADO
  const getEventStyle = (event) => {
    const status = event.resource.status;

    let backgroundColor = "#3b82f6"; // default azul

    if (status === "completado") backgroundColor = "#10b981";
    if (status === "pendiente") backgroundColor = "#f59e0b";

    return {
      style: {
        backgroundColor,
        borderRadius: "8px",
        color: "white",
        border: "none",
        padding: "5px"
      }
    };
  };

  // 🔥 EVENTOS
  const events = services.map(service => ({
    title: `${service.client_name}`,
    start: new Date(service.scheduled_date),
    end: new Date(service.scheduled_date),
    resource: service
  }));

  // 🧠 MOVER EVENTO
  const handleEventDrop = async ({ event, start }) => {
    await onMove(event.resource.id, start);
  };

  return (
    <div style={{ height: "600px", marginTop: "40px" }}>

      <h2 style={{ color: "#1e3a8a" }}>📅 Calendario Inteligente</h2>

      <DnDCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={(event) => setSelectedService(event.resource)}
        eventPropGetter={getEventStyle}
        onEventDrop={handleEventDrop}
        draggableAccessor={() => true}
      />

      {/* MODAL */}
      {selectedService && (
        <div className="modal-overlay">
          <div className="modal">

            <h2>{selectedService.client_name}</h2>
            <p>📞 {selectedService.phone}</p>
            <p>📍 {selectedService.address}</p>
            <p>🧹 {selectedService.service_type}</p>
            <p>💰 {selectedService.price} €</p>
            <p>📅 {selectedService.scheduled_date}</p>

            <div className="modal-actions">

              <button
                onClick={() => {
                  onComplete(selectedService.id);
                  setSelectedService(null);
                }}
              >
                ✅ Completar
              </button>

              <button
                onClick={() => {
                  onDelete(selectedService.id);
                  setSelectedService(null);
                }}
                className="delete-btn"
              >
                🗑 Eliminar
              </button>

              <button onClick={() => setSelectedService(null)}>
                ❌ Cerrar
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default BigCalendar;