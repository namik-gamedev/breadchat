import React, { FC, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { signOut } from 'firebase/auth';
import { appAuth } from 'src/firebase/firebase';
import { unsetUser } from 'src/store/reducers/user.reducer';
import { unsetChats } from 'src/store/reducers/chats.reducer';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import UserService from 'src/services/user.service';

export interface ProfileMenuItemsProps {
   handleClose?: () => void;
}

export const ProfileMenuItems: FC<ProfileMenuItemsProps> = ({ handleClose }) => {
   const user = useAppSelector((state) => state.user.data!);

   const handleSignOut = () => {
      // TODO: add here all resets
      signOut(appAuth);
   };

   return (
      <>
         <MenuItem onClick={handleClose}>
            <ListItemIcon sx={{ color: 'primary.main' }}>
               <PersonIcon />
            </ListItemIcon>
            <Typography>Account</Typography>
         </MenuItem>
         <MenuItem onClick={handleClose}>
            <ListItemIcon sx={{ color: 'primary.main' }}>
               <SettingsIcon />
            </ListItemIcon>
            <Typography>Settings</Typography>
         </MenuItem>
         <Divider />
         <MenuItem onClick={handleSignOut}>
            <ListItemIcon sx={{ color: 'primary.main' }}>
               <LogoutIcon />
            </ListItemIcon>
            <Typography>Sign out</Typography>
         </MenuItem>
      </>
   );
};
