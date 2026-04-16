import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import AvisoLegal from "./pages/AvisoLegal";
import Privacidad from "./pages/Privacidad";
import Cookies from "./pages/Cookies";
import CookieBanner from "./components/CookieBanner";
import PisosTuristicos from "./pages/PisosTuristicos";
import LimpiezaViviendas from "./pages/LimpiezaViviendas";  
import LimpiezaProfunda from "./pages/LimpiezaProfunda";    
import LimpiezaFinObra from "./pages/LimpiezaFinObra";

function App() {
  return (
    <BrowserRouter>
    <CookieBanner />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/aviso-legal" element={<AvisoLegal />} />
        <Route path="/privacidad" element={<Privacidad />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/limpieza-pisos-turisticos-benidorm" element={<PisosTuristicos />} />
        <Route path="/limpieza-viviendas-benidorm" element={<LimpiezaViviendas />} />
        <Route path="/limpieza-profunda-benidorm" element={<LimpiezaProfunda />} />
        <Route path="/limpieza-fin-obra-benidorm" element={<LimpiezaFinObra />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;