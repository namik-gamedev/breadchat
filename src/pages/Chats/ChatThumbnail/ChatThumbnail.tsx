import React, { FC } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ForumIcon from '@mui/icons-material/Forum';
import { UserThumbnail, UserThumbnailProps } from 'src/components/UI/UserThumbnail';
import { IChat, IUser } from 'src/types/types';
import { UserAvatar } from 'src/components/UI/UserAvatar';
import moment from 'moment';
import { truncate } from 'src/utils/truncate.util';
import { UnstyledLink } from 'src/components/UI/UnstyledLink';

export interface ChatThumbnailProps {
   chat: IChat;
   user: IUser;
}

export const ChatThumbnail: FC<ChatThumbnailProps> = ({ chat, user }) => {
   return (
      <Stack direction='row' spacing={1} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
         <Stack direction='row' spacing={2} sx={{ alignItems: 'center' }}>
            <UserAvatar online={user.online} sx={{ width: 50, height: 50, fontSize: '1.5em' }} user={user} />
            <Stack>
               <Typography variant='h5' component='h2'>
                  {user.displayName}
               </Typography>
               <Typography variant='body1' color='grey'>
                  {truncate(chat.messages[chat.messages.length - 1].text, 40)}
               </Typography>
            </Stack>
         </Stack>
         <IconButton component={UnstyledLink} to={`/chat/${user.uid}`}>
            <Badge badgeContent={chat.unreadedMessagesCount} color='info'>
               <ForumIcon color='primary' />
            </Badge>
         </IconButton>
      </Stack>
   );
};
