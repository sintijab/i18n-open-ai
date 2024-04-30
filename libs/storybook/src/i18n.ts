import { initReactI18next } from "react-i18next";
import i18n from "i18next";

const ns = ["components"];
const supportedLngs = ["en", "lv", "de"];

const resources = ns.reduce((acc, n) => {
  supportedLngs.forEach((lng) => {
    try {
      if (!acc[lng]) acc[lng] = {};
      acc[lng] = {
        ...acc[lng],
        [n]: require(`../public/locales/${lng}/${n}.json`),
      };
    } catch (e) {
      console.log(e);
    }
  });
  return acc;
}, {});

void i18n.use(initReactI18next).init({
  //debug: true,
  lng: "en",
  fallbackLng: "en",
  defaultNS: "components",
  ns,
  interpolation: { escapeValue: false },
  resources,
});

export default i18n;
