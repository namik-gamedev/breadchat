import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import React, { FC, useRef } from 'react';
import { StyledMenu } from 'src/components/UI/StyledMenu';
import { useAccount } from 'src/hooks/useAccount';
import { useAnchorEl } from 'src/hooks/useAnchorEl';
import UserService from 'src/services/user.service';
import { AccountMoreMenuItems } from './AccountMoreMenuItems';
import { useOpen } from 'src/hooks/useOpen';
import { BlockUserDialog } from '../BlockUserDialog';

interface Props {
   handleFormShow: () => void;
}

export const AccountMoreMenu: FC<Props> = ({ handleFormShow }) => {
   const user = useAccount().user!;
   const { isUserBlocked } = useAccount();

   const { anchorEl, handleShow, handleClose, open } = useAnchorEl();

   const { open: dialogOpen, handleClose: handleDialogClose, handleShow: handleDialogShow } = useOpen();

   return (
      <Box>
         <IconButton onClick={handleShow}>
            <MoreVertIcon />
         </IconButton>
         <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <AccountMoreMenuItems handleFormShow={handleFormShow} handleBlockDialogShow={handleDialogShow} handleClose={handleClose} />
         </StyledMenu>

         <BlockUserDialog open={dialogOpen} handleClose={handleDialogClose} user={user} blocked={isUserBlocked} />
      </Box>
   );
};
