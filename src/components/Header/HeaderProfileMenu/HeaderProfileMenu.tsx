import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { UserAvatar } from 'src/components/UI/UserAvatar';
import { signOut } from 'firebase/auth';
import { appAuth } from 'src/firebase/firebase';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { StyledMenu } from 'src/components/UI/StyledMenu';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { unsetChats } from 'src/store/reducers/chats.reducer';
import { ProfileMenuItems } from 'src/components/ProfileMenuItems';
import { useAnchorEl } from 'src/hooks/useAnchorEl';

export interface HeaderProfileMenuProps {}

export const HeaderProfileMenu: FC<HeaderProfileMenuProps> = ({}) => {
   const user = useAppSelector((state) => state.user.data);
   const userLoaded = useAppSelector((state) => state.global.dataLoad.user);
   const { anchorEl, open, handleShow, handleClose } = useAnchorEl();

   if (user) {
      return (
         <Box
            sx={{
               display: {
                  sm: 'block',
                  xs: 'none',
               },
            }}
         >
            {userLoaded ? (
               <UserAvatar user={user} onClick={handleShow} withoutBadge />
            ) : (
               <Skeleton variant='circular'>
                  <Avatar />
               </Skeleton>
            )}
            <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
               <ProfileMenuItems handleClose={handleClose} />
            </StyledMenu>
         </Box>
      );
   } else {
      return null;
   }
};
