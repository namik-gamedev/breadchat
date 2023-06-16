import MenuList from '@mui/material/MenuList';
import { FC } from 'react';
import { NavigationMenuItems } from '../NavigationMenuItems';
import { StyledBox } from '../UI/StyledBox';

export interface SidebarProps {}

export const Sidebar: FC<SidebarProps> = ({}) => {
   return (
      <StyledBox>
         {/* <Stack spacing={2}> */}
         {/* <Users />
         <Chats /> */}
         <MenuList>
            <NavigationMenuItems />
         </MenuList>
         {/* </Stack> */}
      </StyledBox>
   );
};
