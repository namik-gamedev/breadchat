import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { UserAvatar } from 'src/components/UI/UserAvatar';
import { signOut } from 'firebase/auth';
import { appAuth } from 'src/firebase/firebase';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { unsetUser } from 'src/store/reducers/UserSlice';
import { StyledMenu } from 'src/components/UI/StyledMenu';
import { useAppSelector } from 'src/hooks/useAppSelector';

export interface ProfileMenuProps {}

export const ProfileMenu: FC<ProfileMenuProps> = ({}) => {
   const user = useAppSelector((state) => state.user.data!);
   const dispatch = useAppDispatch();
   const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
   const isOpen = !!anchorEl;

   const handleClick = (e: React.MouseEvent) => {
      setAnchorEl(e.target as HTMLElement);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   const handleSignOut = () => {
      signOut(appAuth).then(() => {
         dispatch(unsetUser());
      });
   };

   return (
      <Box>
         <UserAvatar user={user} onClick={handleClick} />
         <StyledMenu anchorEl={anchorEl} open={isOpen} onClose={handleClose}>
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
         </StyledMenu>
      </Box>
   );
};
