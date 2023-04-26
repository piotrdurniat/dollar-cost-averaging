import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { fallbackLanguage, supportedLanguages } from "../constants/languages";
import en from "./resources/en";
import pl from "./resources/pl";

const resources = {
  en: {
    translation: en,
  },
  pl: {
    translation: pl,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: supportedLanguages,
    fallbackLng: fallbackLanguage,
    keySeparator: ".",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
