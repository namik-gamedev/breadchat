import React, { FC, useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Header } from 'src/components/Header';
import { Auth } from 'src/pages/Auth';
import { AppContainer } from 'src/components/UI/AppContainer';
import { AppRoutes } from './AppRoutes';
import { Layout } from '../Layout';
import { ThemeProvider } from '@emotion/react';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { darkTheme, lightTheme } from 'src/themes/themes';
import { onAuthStateChanged } from 'firebase/auth';
import { appAuth, db } from 'src/firebase/firebase';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { setUser } from 'src/store/reducers/UserSlice';
import { onValue, ref } from 'firebase/database';
import { IChat, IUser } from 'src/types/types';
import { setUsers } from 'src/store/reducers/UsersSlice';
import { DataLoading } from './DataLoading';
import { setChats } from 'src/store/reducers/ChatsSlice';
import { useDBLoad } from 'src/hooks/useDBLoad';

export interface AppProps {}

export const App: FC<AppProps> = ({}) => {
   const allDataLoaded = useDBLoad();
   const user = useAppSelector((state) => state.user.data);
   const isDark = useAppSelector((state) => state.global.darkTheme);
   const dispatch = useAppDispatch();

   return (
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
         {allDataLoaded() ? (
            <>
               <CssBaseline />
               <Layout>
                  <AppRoutes />
               </Layout>
            </>
         ) : (
            <DataLoading />
         )}
      </ThemeProvider>
   );
};
