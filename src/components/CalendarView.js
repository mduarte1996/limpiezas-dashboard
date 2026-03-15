import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

function CalendarView({ services }) {

    const events = services.map(service => ({
        title: `${service.client_name} - ${service.service_type}`,
        date: service.scheduled_date,
        backgroundColor: service.status === "completado" ? "#22c55e" : "#f59e0b",
        borderColor: service.status === "completado" ? "#22c55e" : "#f59e0b"
    }));

    return (
        <div style={{ marginTop: "40px" }}>
            <h2 style={{ color: "#1e3a8a" }}>Calendario de Servicios</h2>

            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                eventClick={(info) => {
                    alert("Servicio: " + info.event.title);
                }}
                
            />
        </div>
    );
}

export default CalendarView;