import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import PersonIcon from '@mui/icons-material/Person';
import CreateIcon from '@mui/icons-material/Create';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import ReplyIcon from '@mui/icons-material/Reply';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import copy from 'copy-to-clipboard';
import { FC, useRef } from 'react';
import { Trans } from 'react-i18next';
import { useAccount } from 'src/hooks/useAccount';
import { useAppSelector } from 'src/hooks/useAppSelector';
import UserService from 'src/services/user.service';

interface Props {
   handleClose: () => void;
   handleFormShow: () => void;
   handleBlockDialogShow: () => void;
}

export const AccountMoreMenuItems: FC<Props> = ({ handleClose, handleBlockDialogShow, handleFormShow }) => {
   const { isCurrentUser, isUserBlocked } = useAccount();
   const user = useAppSelector((state) => state.user.data)!;

   const inputRef = useRef<HTMLInputElement | null>(null);

   const handlePhotoAdd = () => {
      inputRef.current?.click();
   };

   const handlePhotoSet = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleClose();

      const files = e.target.files;

      if (files && files.length > 0) {
         const file = files[0];

         UserService.setPhotoURL(user.uid, file);
      }
   };

   const handlePhotoDelete = () => {
      handleClose();

      UserService.unsetPhotoURL(user.uid);
   };

   const handleNameEdit = () => {
      handleClose();
      handleFormShow();
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
         <input style={{ display: 'none' }} ref={inputRef} type='file' accept='image/*' onChange={handlePhotoSet} />
         {isCurrentUser ? (
            <>
               <MenuItem onClick={handleNameEdit}>
                  <ListItemIcon>
                     <CreateIcon color='primary' />
                  </ListItemIcon>
                  <Trans>edit name</Trans>
               </MenuItem>

               <MenuItem onClick={handlePhotoAdd}>
                  <ListItemIcon>
                     <AddAPhotoIcon color='primary' />
                  </ListItemIcon>
                  <Trans>select photo</Trans>
               </MenuItem>

               {user.photoURL && (
                  <MenuItem onClick={handlePhotoDelete}>
                     <ListItemIcon>
                        <NoPhotographyIcon color='primary' />
                     </ListItemIcon>
                     <Trans>delete photo</Trans>
                  </MenuItem>
               )}
            </>
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
