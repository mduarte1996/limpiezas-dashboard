import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function IncomeChart({ services }) {

  const incomeByMonth = {};

  services.forEach(service => {
    if (service.status === "completado" && service.price && service.scheduled_date) {

      const date = new Date(service.scheduled_date);
      const month = date.toLocaleString("default", { month: "short" });

      if (!incomeByMonth[month]) {
        incomeByMonth[month] = 0;
      }

      incomeByMonth[month] += Number(service.price);
    }
  });

  const data = {
    labels: Object.keys(incomeByMonth),
    datasets: [
      {
        label: "Ingresos (€)",
        data: Object.values(incomeByMonth),
        backgroundColor: "#2563eb"
      }
    ]
  };

  return (
    <div style={{ width: "500px", marginTop: "40px" }}>
      <h3>Ingresos por Mes</h3>
      <Bar data={data} />
    </div>
  );
}

export default IncomeChart;