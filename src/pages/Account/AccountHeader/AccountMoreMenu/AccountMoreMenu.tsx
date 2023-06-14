import React, { FC, useContext, useRef } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import IconButton from '@mui/material/IconButton';
import { useAnchorEl } from 'src/hooks/useAnchorEl';
import { Trans } from 'react-i18next';
import Typography from '@mui/material/Typography';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PersonIcon from '@mui/icons-material/Person';
import ReplyIcon from '@mui/icons-material/Reply';
import { StyledMenu } from 'src/components/UI/StyledMenu';
import { IUser } from 'src/types/types';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { useIsUserBlocked } from 'src/hooks/useIsUserBlocked';
import copy from 'copy-to-clipboard';
import UserService from 'src/services/user.service';
import { AccountMoreMenuItems } from './AccountMoreMenuItems';
import { useAccountContext } from 'src/hooks/useAccountContext';

export interface AccountMoreMenuProps {
   handleBlockDialogShow: () => void;
}

export const AccountMoreMenu: FC<AccountMoreMenuProps> = ({ handleBlockDialogShow }) => {
   const { anchorEl, handleShow, handleClose, open } = useAnchorEl();

   const inputRef = useRef<HTMLInputElement | null>(null);

   const { isCurrentUser, isUserBlocked } = useAccountContext();
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
