import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { format, parse, startOfWeek, getDay } from "date-fns";
import es from "date-fns/locale/es";
import { useState } from "react";

const locales = {
  es: es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function BigCalendar({ services, onComplete, onDelete }) {

  const [selectedService, setSelectedService] = useState(null);

  //  CONVERTIR SERVICIOS A EVENTOS
  const events = services.map(service => ({
    title: `${service.client_name} - ${service.service_type}`,
    start: new Date(service.scheduled_date),
    end: new Date(service.scheduled_date),
    resource: service
  }));

  return (
    <div style={{ height: "600px", marginTop: "40px" }}>

      <h2 style={{ color: "#1e3a8a" }}>📅 Calendario Profesional</h2>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={(event) => setSelectedService(event.resource)}
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