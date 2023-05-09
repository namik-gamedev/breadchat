import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useAnchorEl } from 'src/hooks/useAnchorEl';
import Popover from '@mui/material/Popover';
import { StyledMenu } from 'src/components/UI/StyledMenu';
import { useAppSelector } from 'src/hooks/useAppSelector';

export interface NotificationsMenuProps {}

export const NotificationsMenu: FC<NotificationsMenuProps> = ({}) => {
   const { anchorEl, open, handleShow, handleClose } = useAnchorEl();

   const chats = useAppSelector((state) => state.chats.data);
   const notificationsCount = chats.reduce((total, chat) => total + chat.unreadedMessagesCount, 0);

   return (
      <Box>
         <IconButton onClick={handleShow}>
            <Badge badgeContent={notificationsCount} color='info'>
               <NotificationsNoneIcon color='primary' />
            </Badge>
         </IconButton>
         <Popover anchorEl={anchorEl} open={open} onClose={handleClose}></Popover>
      </Box>
   );
};
