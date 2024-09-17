import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { English, Gujarati, Hindi } from './en';

i18n.use(initReactI18next).init({
  resources: {
    en: English,
    hi: Hindi,
    gu: Gujarati,
  },
  lng: 'en',
  fallbackLng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: 'v3',
  defaultNS: 'general',
});

export default i18n;
