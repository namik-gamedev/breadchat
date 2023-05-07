import React, { FC } from 'react';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import GroupIcon from '@mui/icons-material/Group';
import ForumIcon from '@mui/icons-material/Forum';
import Typography from '@mui/material/Typography';
import { UnstyledLink } from '../UI/UnstyledLink';

export interface NavigationMenuItemsProps {
   handleClose?: () => void;
}

export const NavigationMenuItems: FC<NavigationMenuItemsProps> = ({ handleClose }) => {
   return (
      <>
         <MenuItem component={UnstyledLink} to='/users' onClick={handleClose}>
            <ListItemIcon>
               <GroupIcon color='primary' />
            </ListItemIcon>
            <Typography>Users</Typography>
         </MenuItem>

         <MenuItem component={UnstyledLink} to='/chats' onClick={handleClose}>
            <ListItemIcon>
               <ForumIcon color='primary' />
            </ListItemIcon>
            <Typography>Chats</Typography>
         </MenuItem>
      </>
   );
};
