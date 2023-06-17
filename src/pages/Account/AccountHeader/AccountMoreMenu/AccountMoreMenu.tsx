import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import React, { FC, useRef } from 'react';
import { StyledMenu } from 'src/components/UI/StyledMenu';
import { useAccountContext } from 'src/hooks/useAccountContext';
import { useAnchorEl } from 'src/hooks/useAnchorEl';
import UserService from 'src/services/user.service';
import { AccountMoreMenuItems } from './AccountMoreMenuItems';

interface Props {
   handleBlockDialogShow: () => void;
}

export const AccountMoreMenu: FC<Props> = ({ handleBlockDialogShow }) => {
   const { anchorEl, handleShow, handleClose, open } = useAnchorEl();

   return (
      <Box>
         <IconButton onClick={handleShow}>
            <MoreVertIcon />
         </IconButton>
         <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <AccountMoreMenuItems handleBlockDialogShow={handleBlockDialogShow} handleClose={handleClose} />
         </StyledMenu>
      </Box>
   );
};
