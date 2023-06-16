import { ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { onDisconnect, ref, serverTimestamp } from 'firebase/database';
import moment from 'moment';
import { FC, useEffect } from 'react';
import { db } from 'src/firebase/firebase';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { useDBSetup } from 'src/hooks/useDBSetup';
import i18n from 'src/i18n/i18n';
import { enLocaleSpec } from 'src/locales/en.localeSpec';
import { ruLocaleSpec } from 'src/locales/ru.localeSpec';
import {} from 'src/store/reducers/global.reducer';
import { darkTheme, lightTheme } from 'src/themes/themes';
import { ILanguage } from 'src/types/types';
import { Layout } from '../Layout';
import { AppRoutes } from './AppRoutes';

export const App: FC = () => {
   const isDark = useAppSelector((state) => state.global.darkTheme);
   const user = useAppSelector((state) => state.user.data);
   const language = useAppSelector((state) => state.global.language);

   useDBSetup();

   useEffect(() => {
      console.log(navigator.language);

      moment.updateLocale(language, language === ILanguage.EN ? enLocaleSpec : ruLocaleSpec);
      i18n.changeLanguage(language);
   }, [language]);

   useEffect(() => {
      if (user) {
         const userOnlineRef = ref(db, `users/${user.uid}/online`);
         const lastSeeneRef = ref(db, `users/${user.uid}/lastSeen`);
         onDisconnect(userOnlineRef).set(false);
         onDisconnect(lastSeeneRef).set(serverTimestamp());
      }
   }, [user]);

   return (
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
         <CssBaseline enableColorScheme />
         <Layout>
            <AppRoutes />
         </Layout>
      </ThemeProvider>
   );
};
