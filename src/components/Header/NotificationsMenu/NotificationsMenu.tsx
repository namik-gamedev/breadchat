import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useAnchorEl } from 'src/hooks/useAnchorEl';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import { StyledMenu } from 'src/components/UI/StyledMenu';
import { useAppSelector } from 'src/hooks/useAppSelector';
import Typography from '@mui/material/Typography';
import { UserThumbnail } from 'src/components/UI/UserThumbnail';
import { ChatThumbnail } from 'src/pages/Chats/ChatThumbnail';
import { Trans } from 'react-i18next';

export interface NotificationsMenuProps {}

export const NotificationsMenu: FC<NotificationsMenuProps> = ({}) => {
   const { anchorEl, open, handleShow, handleClose } = useAnchorEl();

   const chats = useAppSelector((state) => state.chats.data);
   const chatsWithUnreadedMessages = chats.filter((chat) => chat.unreadedMessagesCount > 0);

   return (
      <Box>
         <IconButton onClick={handleShow}>
            <Badge invisible={!chatsWithUnreadedMessages.length} variant='dot' color='info'>
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
            elevation={2}
         >
            <Stack
               spacing={2}
               sx={{
                  width: 300,
                  p: 2,
               }}
            >
               {chatsWithUnreadedMessages.length > 0 ? (
                  chatsWithUnreadedMessages.map((chat) => (
                     <Box onClick={handleClose}>
                        <ChatThumbnail chat={chat} />
                     </Box>
                  ))
               ) : (
                  <Typography sx={{ textAlign: 'center' }}>
                     <Trans>no notifications</Trans>
                  </Typography>
               )}
            </Stack>
         </Popover>
      </Box>
   );
};
