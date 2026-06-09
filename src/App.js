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
import GestionTuristica from "./pages/GestionTuristica";
import LimpiezaBenidorm from "./pages/LimpiezaBenidorm";
import LimpiezaAltea from "./pages/LimpiezaAltea";
import LimpiezaAlteahills from "./pages/LimpiezaAlteahills";
import LimpiezaMascarat from "./pages/LimpiezaMascarat";
import LimpiezaAlbir from "./pages/LimpiezaAlbir";
import LimpiezaFinestrat from "./pages/LimpiezaFinestrat";
import LimpiezaVillajoyosa from "./pages/LimpiezaVillajoyosa";
import LimpiezaLanucia from "./pages/LimpiezaLanucia";

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
        <Route path="/gestion-alquiler-turistico-benidorm" element={<GestionTuristica />} />
        <Route path="/limpieza-benidorm" element={<LimpiezaBenidorm />} />
        <Route path="/limpieza-altea" element={<LimpiezaAltea />} />
        <Route path="/limpieza-alteahills" element={<LimpiezaAlteahills />} />
        <Route path="/limpieza-mascarat" element={<LimpiezaMascarat />} />
        <Route path="/limpieza-albir" element={<LimpiezaAlbir />} />
        <Route path="/limpieza-finestrat" element={<LimpiezaFinestrat />} />
        <Route path="/limpieza-villajoyosa" element={<LimpiezaVillajoyosa />} />
        <Route path="/limpieza-lanucia" element={<LimpiezaLanucia />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;