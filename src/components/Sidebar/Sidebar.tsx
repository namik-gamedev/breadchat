import React, { FC, useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import Typography from '@mui/material/Typography';
import { StyledBox } from '../UI/StyledBox';
import { UnstyledLink } from '../UI/UnstyledLink';

export interface SidebarProps {}

export const Sidebar: FC<SidebarProps> = ({}) => {
   return (
      <StyledBox>
         {/* <Stack spacing={2}> */}
         {/* <Users />
         <Chats /> */}
         <MenuList>
            <MenuItem component={UnstyledLink} to='/users'>
               <ListItemIcon>
                  <PersonIcon color='primary' />
               </ListItemIcon>
               <Typography>Users</Typography>
            </MenuItem>

            <MenuItem component={UnstyledLink} to='/chats'>
               <ListItemIcon>
                  <ForumIcon color='primary' />
               </ListItemIcon>
               <Typography>Chats</Typography>
            </MenuItem>
         </MenuList>
         {/* </Stack> */}
      </StyledBox>
   );
};
