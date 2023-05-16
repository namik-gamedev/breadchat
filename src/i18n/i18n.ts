import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEn from 'src/locales/translations/en.translation.json';
import translationRu from 'src/locales/translations/ru.translation.json';

const resources: Resource = {
   en: {
      translation: translationEn,
   },
   ru: {
      translation: translationRu,
   },
};

i18n.use(initReactI18next).init({
   resources,
   lng: 'en',
});

export default i18n;
