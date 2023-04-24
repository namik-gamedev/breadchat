import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Header } from '../Header';
import { AppContainer } from '../UI/AppContainer';
import { Sidebar } from 'src/components/Sidebar';
import { useAppSelector } from 'src/hooks/useAppSelector';

export interface LayoutProps {
   children: React.ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
   const user = useAppSelector((state) => state.user.data);

   return (
      <Box>
         <Header />
         <AppContainer>
            <Grid container spacing={2} sx={{ mt: 0 }} direction='row'>
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
               <Grid item xs>
                  {children}
               </Grid>
            </Grid>
         </AppContainer>
         {/* footer */}
      </Box>
   );
};
