import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import headerEn from 'src/translations/en/header.json';
import headerRu from 'src/translations/ru/header.json';

const resources: Resource = {
   en: {
      header: headerEn,
   },
   ru: {
      header: headerRu,
   },
};

i18n.use(initReactI18next).init({
   resources,
   lng: 'en',
});

export default i18n;
