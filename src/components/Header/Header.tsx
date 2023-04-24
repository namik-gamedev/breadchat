import React, { FC, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import { Logo } from 'src/components/Header/Logo';
import Toolbar from '@mui/material/Toolbar';
import { AppContainer } from 'src/components/UI/AppContainer';
import { ThemeToggler } from './ThemeToggler';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { ProfileMenu } from './ProfileMenu';

export interface HeaderProps {}

export const Header: FC<HeaderProps> = ({}) => {
   const user = useAppSelector((state) => state.user.data);

   return (
      <AppBar position='relative' color='inherit' elevation={0} sx={{ boxShadow: 5 }}>
         <Toolbar>
            <AppContainer>
               <Stack direction='row' alignItems='center' justifyContent='space-between'>
                  {/* <HeaderMenu /> */}
                  <Logo />
                  {/* <Button color='primary' variant='contained'>
                     Sign in
                  </Button> */}
                  <Stack spacing={1} direction='row' alignItems='center'>
                     <ThemeToggler />
                     {user && <ProfileMenu />}
                  </Stack>
               </Stack>
            </AppContainer>
         </Toolbar>
      </AppBar>
   );
};
