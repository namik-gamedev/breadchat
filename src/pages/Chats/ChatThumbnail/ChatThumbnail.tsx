import React, { FC } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { UserThumbnail, UserThumbnailProps } from 'src/components/UI/UserThumbnail';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import { UnstyledLink } from 'src/components/UI/UnstyledLink';
import { IChat } from 'src/types/types';
import { UserAvatar } from 'src/components/UI/UserAvatar';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { isMessageUnreaded } from 'src/utils/isMessageUnreaded.util';
import { UnreadedMessagesCountDisplay } from 'src/components/UI/UnreadedMessagesCountDisplay';
import moment from 'moment';

export interface ChatThumbnailProps {
   chat: IChat;
}

export const ChatThumbnail: FC<ChatThumbnailProps> = ({ chat }) => {
   const lastMessage = chat.messages[chat.messages.length - 1];
   const isLastMessageUnreaded = isMessageUnreaded(chat, lastMessage);

   return (
      <Stack component={UnstyledLink} to={`/chat/${chat.interlocutor.uid}`} sx={{ alignItems: 'center' }} direction='row' spacing={2}>
         <UserAvatar sx={{ width: 50, height: 50, fontSize: '1.5em' }} user={chat.interlocutor} />
         <Box sx={{ minWidth: 0, width: 1 }}>
            <Stack direction='row' spacing={1} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
               <Typography noWrap variant='h6' sx={{ fontWeight: chat.unreadedMessagesCount > 0 ? 500 : 'normal' }} component='h2'>
                  {chat.interlocutor.displayName}
               </Typography>
               <Typography variant='body1' sx={{ color: 'text.secondary' }}>
                  {moment(lastMessage.createdAt).fromNow(true)}
               </Typography>
            </Stack>

            <Stack direction='row' spacing={1} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
               <Typography
                  variant='body1'
                  noWrap
                  sx={{
                     color: chat.unreadedMessagesCount > 0 ? 'text' : 'text.secondary',
                     fontWeight: chat.unreadedMessagesCount > 0 ? 500 : 'normal',
                  }}
               >
                  {lastMessage.text}
               </Typography>
               <Stack direction='row'>
                  <UnreadedMessagesCountDisplay count={chat.unreadedMessagesCount} />
                  {lastMessage.sender === 0 &&
                     (isLastMessageUnreaded ? (
                        <CheckIcon sx={{ color: 'text.secondary' }} fontSize='small' />
                     ) : (
                        <DoneAllIcon sx={{ color: 'text.secondary' }} fontSize='small' />
                     ))}
               </Stack>
            </Stack>
         </Box>
      </Stack>
   );
};
