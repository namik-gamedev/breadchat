import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { FC } from 'react';
import { Logo } from 'src/components/Header/Logo';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { HeaderNavigationMenu } from './HeaderNavigationMenu';
import { HeaderProfileMenu } from './HeaderProfileMenu';
import { LanguageToggler } from './LanguageToggler';
import { ThemeToggler } from './ThemeToggler';

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
