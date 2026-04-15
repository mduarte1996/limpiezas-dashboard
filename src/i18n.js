import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  es: {
    translation: {
      inicio: "Inicio",
      servicios: "Servicios",
      sobre: "Sobre nosotros",
      contacto: "Contacto",
      solicitar: "Solicitar presupuesto"
    }
  },
  en: {
    translation: {
      inicio: "Home",
      servicios: "Services",
      sobre: "About us",
      contacto: "Contact",
      solicitar: "Request quote"
    }
  }
};

i18n
.use(initReactI18next)
.init({
  resources,
  lng: "es",
  fallbackLng: "es",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;