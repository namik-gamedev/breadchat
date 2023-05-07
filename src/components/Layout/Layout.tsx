import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { Header } from '../Header';
import { Sidebar } from 'src/components/Sidebar';
import { useAppSelector } from 'src/hooks/useAppSelector';

export interface LayoutProps {
   children: React.ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
   const user = useAppSelector((state) => state.user.data);

   return (
      <Stack direction='column' sx={{ height: 'calc(100vh - 65px)' }}>
         <Header />
         <Container sx={{ height: 1 }}>
            <Grid container spacing={2} sx={{ pt: 2, height: 1 }}>
               {user && (
                  <Grid
                     item
                     xs={3}
                     sx={{
                        display: {
                           md: 'block',
                           xs: 'none',
                        },
                     }}
                  >
                     {/* TODO: SHOW HEADER MENU WHEN SIDEBAR IS HIDDEN */}
                     <Sidebar />
                  </Grid>
               )}
               <Grid item xs sx={{ height: 1 }}>
                  {children}
               </Grid>
            </Grid>
         </Container>
         {/* todo: footer */}
      </Stack>
   );
};
