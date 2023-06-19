import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import React, { FC } from 'react';
import { Sidebar } from 'src/components/Sidebar';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { Header } from '../Header';

interface Props {
   children: React.ReactNode;
}

export const Layout: FC<Props> = ({ children }) => {
   const user = useAppSelector((state) => state.user.data);

   return (
      <Stack direction='column' sx={{ height: '100vh' }}>
         <Header />
         <Container sx={{ height: 1 }}>
            <Grid container spacing={2} sx={{ pt: { md: 2, xs: 1 }, height: 1 }}>
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
                     <Sidebar />
                  </Grid>
               )}
               <Grid item xs sx={{ height: 1, minWidth: 0 }}>
                  {children}
               </Grid>
            </Grid>
         </Container>
      </Stack>
   );
};
