import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import PersonIcon from '@mui/icons-material/Person';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import ReplyIcon from '@mui/icons-material/Reply';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import copy from 'copy-to-clipboard';
import { FC, useRef } from 'react';
import { Trans } from 'react-i18next';
import { useAccountContext } from 'src/hooks/useAccountContext';

interface Props {
   handleClose: () => void;
   handleBlockDialogShow: () => void;
}

export const AccountMoreMenuItems: FC<Props> = ({ handleClose, handleBlockDialogShow }) => {
   const { isCurrentUser, isUserBlocked } = useAccountContext();

   const inputRef = useRef<HTMLInputElement | null>(null);

   const handlePhotoAdd = () => {
      handleClose();
      inputRef.current?.click();
   };

   const handleUserBlock = () => {
      handleClose();
      handleBlockDialogShow();
   };

   const handleLinkCopy = () => {
      handleClose();
      copy(document.URL);
   };

   return (
      <>
         {isCurrentUser ? (
            <MenuItem onClick={handlePhotoAdd}>
               <ListItemIcon>
                  <AddAPhotoIcon color='primary' />
               </ListItemIcon>
               <Trans>select photo</Trans>
            </MenuItem>
         ) : (
            <MenuItem onClick={handleUserBlock}>
               <ListItemIcon>{isUserBlocked ? <PersonIcon color='primary' /> : <PersonOffIcon color='primary' />}</ListItemIcon>
               <Trans>{isUserBlocked ? 'unblock user' : 'block user'}</Trans>
            </MenuItem>
         )}
         <MenuItem onClick={handleLinkCopy}>
            <ListItemIcon>
               <ReplyIcon color='primary' />
            </ListItemIcon>
            <Trans>copy link</Trans>
         </MenuItem>
      </>
   );
};
