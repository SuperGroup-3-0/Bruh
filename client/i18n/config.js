import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from "i18next-browser-languagedetector";

i18n
    .use(detector)
    .use(initReactI18next)
    .init({
    fallbackLng: 'en',
    resources: {
      en: {
        translations: require('./locales/en/translations.json')
      },
      uk: {
        translations: require('./locales/uk/translations.json')
      }
    },
    ns: ['translations'],
    defaultNS: 'translations'
  });
  

  i18n.languages = ['en', 'uk'];
  
  export default i18n;