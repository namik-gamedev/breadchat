import React, { FC } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ForumIcon from '@mui/icons-material/Forum';
import { UserThumbnail } from 'src/components/UI/UserThumbnail';
import { IChat, IUser } from 'src/types/types';
import { UserAvatar } from 'src/components/UI/UserAvatar';
import moment from 'moment';
import { UnstyledLink } from 'src/components/UI/UnstyledLink';

export interface ChatThumbnailProps {
   chat: IChat;
   user: IUser;
}

export const ChatThumbnail: FC<ChatThumbnailProps> = ({ chat, user }) => {
   return (
      <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
         <UserThumbnail user={user} />
         <IconButton component={UnstyledLink} to={`/chat/${user.uid}`}>
            <Badge badgeContent={chat.unreadedMessagesCount} color='info'>
               <ForumIcon color='primary' />
            </Badge>
         </IconButton>
      </Stack>
   );
};
