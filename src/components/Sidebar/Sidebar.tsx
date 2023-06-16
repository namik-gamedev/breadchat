import MenuList from '@mui/material/MenuList';
import { FC } from 'react';
import { NavigationMenuItems } from '../NavigationMenuItems';
import { StyledBox } from '../UI/StyledBox';

export const Sidebar: FC = () => {
   return (
      <StyledBox>
         <MenuList>
            <NavigationMenuItems />
         </MenuList>
      </StyledBox>
   );
};
