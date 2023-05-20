import React, { FC, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { Logo } from 'src/components/Header/Logo';
import { ThemeToggler } from './ThemeToggler';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { HeaderProfileMenu } from './HeaderProfileMenu';
import Box from '@mui/material/Box';
import { HeaderNavigationMenu } from './HeaderNavigationMenu';
import { LanguageToggler } from './LanguageToggler';

export interface HeaderProps {}

export const Header: FC<HeaderProps> = ({}) => {
   const user = useAppSelector((state) => state.user.data);

   return (
      <AppBar color='inherit' elevation={0} sx={{ boxShadow: 3, position: 'initial' }}>
         <Toolbar>
            <Container>
               <Stack direction='row' alignItems='center' justifyContent='space-between'>
                  {user && <HeaderNavigationMenu />}
                  <Logo />
                  <Stack spacing={1} direction='row' alignItems='center'>
                     <LanguageToggler />
                     <ThemeToggler />
                     <HeaderProfileMenu />
                  </Stack>
               </Stack>
            </Container>
         </Toolbar>
      </AppBar>
   );
};
