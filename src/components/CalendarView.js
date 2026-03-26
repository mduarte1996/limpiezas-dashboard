import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CalendarView({ services }) {

  // FILTRAR SERVICIOS POR FECHA
  const getServicesByDate = (date) => {
    return services.filter(service => {
      if (!service.scheduled_date) return false;

      const serviceDate = new Date(service.scheduled_date);

      return (
        serviceDate.getDate() === date.getDate() &&
        serviceDate.getMonth() === date.getMonth() &&
        serviceDate.getFullYear() === date.getFullYear()
      );
    });
  };

  return (
    <div style={{ marginTop: "40px" }}>

      <h2 style={{ color: "#1e3a8a" }}>
        📅 Agenda de servicios
      </h2>

      <Calendar

        tileContent={({ date }) => {
          const dailyServices = getServicesByDate(date);

          return (
            <div style={{ marginTop: "5px" }}>
              {dailyServices.map(service => (
                <div
                  key={service.id}
                  style={{
                    background: "#2563eb",
                    color: "white",
                    fontSize: "10px",
                    marginTop: "2px",
                    borderRadius: "5px",
                    padding: "2px"
                  }}
                >
                  {service.client_name}
                </div>
              ))}
            </div>
          );
        }}

      />

    </div>
  );
}

export default CalendarView;