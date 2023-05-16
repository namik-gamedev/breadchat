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
import { Trans } from 'react-i18next';

export interface ProfileMenuItemsProps {
   handleClose?: () => void;
}

export const ProfileMenuItems: FC<ProfileMenuItemsProps> = ({ handleClose }) => {
   const user = useAppSelector((state) => state.user.data!);
   const dispatch = useAppDispatch();

   const handleSignOut = async () => {
      // TODO: add here all resets
      await signOut(appAuth);
      UserService.setOnline(user.uid, false);
      dispatch(unsetUser());
      dispatch(unsetChats());
   };

   return (
      <>
         <MenuItem onClick={handleClose}>
            <ListItemIcon sx={{ color: 'primary.main' }}>
               <PersonIcon />
            </ListItemIcon>
            <Typography>
               <Trans>account</Trans>
            </Typography>
         </MenuItem>
         <MenuItem onClick={handleClose}>
            <ListItemIcon sx={{ color: 'primary.main' }}>
               <SettingsIcon />
            </ListItemIcon>
            <Typography>
               <Trans>settings</Trans>
            </Typography>
         </MenuItem>
         <Divider />
         <MenuItem onClick={handleSignOut}>
            <ListItemIcon sx={{ color: 'primary.main' }}>
               <LogoutIcon />
            </ListItemIcon>
            <Typography>
               <Trans>sign out</Trans>
            </Typography>
         </MenuItem>
      </>
   );
};
