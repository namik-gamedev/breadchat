import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import { signOut } from 'firebase/auth';
import { FC } from 'react';
import { Trans } from 'react-i18next';
import { appAuth } from 'src/firebase/firebase';
import { useAppSelector } from 'src/hooks/useAppSelector';
import UserService from 'src/services/user.service';
import { UnstyledLink } from '../UI/UnstyledLink';

interface Props {
   handleClose?: () => void;
}

export const ProfileMenuItems: FC<Props> = ({ handleClose }) => {
   const user = useAppSelector((state) => state.user.data)!;

   const handleSignOut = async () => {
      handleClose!();
      signOut(appAuth);
      UserService.setOnline(user.uid, false);
   };

   return (
      <>
         <MenuItem component={UnstyledLink} to={`/account/${user.uid}`} onClick={handleClose}>
            <ListItemIcon sx={{ color: 'primary.main' }}>
               <PersonIcon />
            </ListItemIcon>
            <Trans>account</Trans>
         </MenuItem>
         <MenuItem onClick={handleClose}>
            <ListItemIcon sx={{ color: 'primary.main' }}>
               <SettingsIcon />
            </ListItemIcon>
            <Trans>settings</Trans>
         </MenuItem>
         <Divider />
         <MenuItem onClick={handleSignOut}>
            <ListItemIcon sx={{ color: 'primary.main' }}>
               <LogoutIcon />
            </ListItemIcon>
            <Trans>sign out</Trans>
         </MenuItem>
      </>
   );
};
