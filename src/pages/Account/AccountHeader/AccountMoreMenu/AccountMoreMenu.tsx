import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import React, { FC, useRef } from 'react';
import { StyledMenu } from 'src/components/UI/StyledMenu';
import { useAccountContext } from 'src/hooks/useAccountContext';
import { useAnchorEl } from 'src/hooks/useAnchorEl';
import UserService from 'src/services/user.service';
import { AccountMoreMenuItems } from './AccountMoreMenuItems';

export interface AccountMoreMenuProps {
   handleBlockDialogShow: () => void;
}

export const AccountMoreMenu: FC<AccountMoreMenuProps> = ({ handleBlockDialogShow }) => {
   const { anchorEl, handleShow, handleClose, open } = useAnchorEl();

   const inputRef = useRef<HTMLInputElement | null>(null);

   const user = useAccountContext().user!;

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      if (files && files.length > 0) {
         const file = files[0];

         UserService.setPhotoURL(user.uid, file);
      }
   };

   return (
      <Box>
         <input style={{ display: 'none' }} ref={inputRef} type='file' accept='image/*' onChange={handleChange} />

         <IconButton onClick={handleShow}>
            <MoreVertIcon />
         </IconButton>
         <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <AccountMoreMenuItems handleBlockDialogShow={handleBlockDialogShow} handleClose={handleClose} />
         </StyledMenu>
      </Box>
   );
};
