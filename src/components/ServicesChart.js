import { Pie } from "react-chartjs-2";
import {
Chart as ChartJS,
ArcElement,
Tooltip,
Legend
} from "chart.js";

ChartJS.register(
ArcElement,
Tooltip,
Legend
);

function ServicesChart({ services }) {

const completed = services.filter(s => s.status === "completado").length;
const pending = services.filter(s => s.status === "pendiente").length;

const data = {
labels: ["Completados", "Pendientes"],
datasets: [
{
data: [completed, pending],
backgroundColor: ["#22c55e", "#f59e0b"]
}
]
};

return (
<div style={{width:"300px", marginTop:"40px"}}>
<h3>Estado de Servicios</h3>
<Pie data={data} />
</div>
);
}

export default ServicesChart;