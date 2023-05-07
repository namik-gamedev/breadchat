import React, { FC, useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Header } from 'src/components/Header';
import { Auth } from 'src/pages/Auth';
import { AppRoutes } from './AppRoutes';
import { Layout } from '../Layout';
import { ThemeProvider } from '@emotion/react';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { darkTheme, lightTheme } from 'src/themes/themes';
import { onAuthStateChanged } from 'firebase/auth';
import { appAuth, db } from 'src/firebase/firebase';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { onValue, ref } from 'firebase/database';
import { setUsers } from 'src/store/reducers/users.reducer';
import { DataLoading } from './DataLoading';
import { setChats } from 'src/store/reducers/chats.reducer';
import { useDBSetup } from 'src/hooks/useDBSetup';
import { useBeforeUnload } from 'react-router-dom';
import { useDataLoaded } from 'src/hooks/useDataLoaded';
import UserService from 'src/services/user.service';

export interface AppProps {}

export const App: FC<AppProps> = ({}) => {
   const isDark = useAppSelector((state) => state.global.darkTheme);
   const user = useAppSelector((state) => state.user.data);
   const allDataLoaded = useDataLoaded();

   useDBSetup();

   useEffect(() => {
      if (user) {
         UserService.setOnline(user.uid, false);
      }

      window.onunload = () => {
         if (!user) {
            return;
         }
         UserService.setOnline(user.uid, false);
      };
      window.onbeforeunload = () => {
         if (!user) {
            return;
         }
         UserService.setOnline(user.uid, false);
      };
   }, []);

   return (
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
         {allDataLoaded ? (
            <>
               <CssBaseline enableColorScheme />
               <Layout>
                  <AppRoutes />
               </Layout>
            </>
         ) : (
            <DataLoading /> // todo: replace with skeletons
         )}
      </ThemeProvider>
   );
};
