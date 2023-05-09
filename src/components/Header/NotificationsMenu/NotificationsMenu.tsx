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
import { ChatThumbnail } from 'src/pages/Chats/ChatThumbnail';

export interface NotificationsMenuProps {}

export const NotificationsMenu: FC<NotificationsMenuProps> = ({}) => {
   const { anchorEl, open, handleShow, handleClose } = useAnchorEl();

   const chats = useAppSelector((state) => state.chats.data);
   const chatsWithUnreadedMessages = chats.filter((chat) => chat.unreadedMessagesCount > 0);
   const totalUnreadedMessagesCount = chatsWithUnreadedMessages.reduce((total, chat) => total + chat.unreadedMessagesCount, 0);

   return (
      <Box>
         <IconButton onClick={handleShow}>
            <Badge badgeContent={totalUnreadedMessagesCount} color='info'>
               <NotificationsNoneIcon color='primary' />
            </Badge>
         </IconButton>
         <Popover
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            transformOrigin={{
               horizontal: 'right',
               vertical: 'top',
            }}
            sx={{ overflow: 'scroll', maxHeight: 200 }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
         >
            {chatsWithUnreadedMessages.map((chat) => (
               <Box sx={{ width: 300, p: 2 }}>
                  <ChatThumbnail chat={chat} />
               </Box>
            ))}
         </Popover>
      </Box>
   );
};
