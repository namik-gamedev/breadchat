import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Auth } from 'src/pages/Auth';
import { Chats } from 'src/pages/Chats';
import { NotFound } from 'src/pages/NotFound';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { routes } from 'src/routes/routes';
import { Chat } from 'src/pages/Chat';

export interface AppRoutesProps {}

export const AppRoutes: FC<AppRoutesProps> = ({}) => {
   const user = useAppSelector((state) => state.user.data);
   const userLoaded = useAppSelector((state) => state.global.dataLoad.user);
   const usersLoaded = useAppSelector((state) => state.global.dataLoad.users);

   return (
      <Routes>
         {routes.map((route, index) => (
            <Route
               key={index}
               path={route.path}
               element={route.authRequired && usersLoaded && userLoaded && !user ? <Auth /> : <route.component />}
            />
         ))}
         <Route path='/' element={userLoaded && !user ? <Auth /> : <Chats />} />
         <Route path='*' element={<NotFound />} />
      </Routes>
   );
};
