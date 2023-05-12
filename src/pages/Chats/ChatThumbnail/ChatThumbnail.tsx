import React, { FC } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { UserThumbnail, UserThumbnailProps } from 'src/components/UI/UserThumbnail';
import Typography from '@mui/material/Typography';
import { UnstyledLink } from 'src/components/UI/UnstyledLink';
import { IChat } from 'src/types/types';
import { UserAvatar } from 'src/components/UI/UserAvatar';
import moment from 'moment';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { isMessageUnreaded } from 'src/utils/isMessageUnreaded.util';

export interface ChatThumbnailProps {
   chat: IChat;
}

export const ChatThumbnail: FC<ChatThumbnailProps> = ({ chat }) => {
   const lastMessage = chat.messages[chat.messages.length - 1];
   const isLastMessageUnreaded = isMessageUnreaded(chat, lastMessage);

   return (
      <Stack
         component={UnstyledLink}
         to={`/chat/${chat.interlocutor.uid}`}
         sx={{ cursor: 'pointer', alignItems: 'center' }}
         direction='row'
         spacing={2}
      >
         <UserAvatar online={chat.interlocutor.online} sx={{ width: 50, height: 50, fontSize: '1.5em' }} user={chat.interlocutor} />
         <Box sx={{ minWidth: 0 }}>
            <Typography variant='h5' component='h2'>
               {chat.interlocutor.displayName}
            </Typography>
            <Stack direction='row'>
               <Typography variant='body1' noWrap sx={{ color: 'text.secondary' }}>
                  {/* {chat.interlocutor.online ? 'Online' : `last seen ${moment(chat.interlocutor.lastSeen).calendar()}`} */}
                  {/* {truncate(chat.messages[chat.messages.length - 1].text, 30)} */}
                  {lastMessage.text}
               </Typography>
               {lastMessage.sender === 0 &&
                  (isLastMessageUnreaded ? (
                     <CheckIcon sx={{ color: 'text.secondary' }} fontSize='small' />
                  ) : (
                     <DoneAllIcon sx={{ color: 'text.secondary' }} fontSize='small' />
                  ))}
            </Stack>
         </Box>
      </Stack>
   );
};
