import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { Auth } from 'src/pages/Auth';
import { Chats } from 'src/pages/Chats';
import { NotFound } from 'src/pages/NotFound';
import { routes } from 'src/routes/routes';

export const AppRoutes: FC = () => {
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
