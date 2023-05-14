import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEn from 'src/translations/translation.en.json';
import translationRu from 'src/translations/translation.ru.json';

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
