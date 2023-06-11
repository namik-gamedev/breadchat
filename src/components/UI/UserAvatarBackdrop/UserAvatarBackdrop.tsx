import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';

export interface UserAvatarBackdropProps {
   open: boolean;
   handleClose: () => void;
   photoURL: string | null | undefined;
}

export const UserAvatarBackdrop: FC<UserAvatarBackdropProps> = ({ open, handleClose, photoURL }) => {
   return (
      <Backdrop sx={{ zIndex: 1100 }} open={open} onClick={handleClose}>
         <Box component='img' src={photoURL || ''} sx={{ maxHeight: 1, maxWidth: 1 }} />
      </Backdrop>
   );
};
