import React, { FC, useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import Typography from '@mui/material/Typography';
import { StyledBox } from '../UI/StyledBox';
import { NavigationMenuItems } from '../NavigationMenuItems';

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
