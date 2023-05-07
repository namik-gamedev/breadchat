import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import AspectRatio from '@mui/joy/AspectRatio';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ForumIcon from '@mui/icons-material/Forum';
import { UserAvatar } from 'src/components/UI/UserAvatar';
import { IUser, IUserWithDBFields } from 'src/types/types';
import { UnstyledLink } from 'src/components/UI/UnstyledLink';
import moment from 'moment';

export interface UserThumbnailProps {
   user: IUserWithDBFields;
}

export const UserThumbnail: FC<UserThumbnailProps> = ({ user }) => {
   return (
      <Stack direction='row' spacing={2} alignItems='center'>
         <UserAvatar withoutBadge={!user.online} sx={{ width: 50, height: 50, fontSize: '1.5em' }} user={user} />
         <Box>
            <Typography variant='h5'>{user.displayName}</Typography>
            <Typography variant='body1' sx={{ color: 'grey' }}>
               {user.online ? (user.typing ? 'Typing...' : 'Online') : `last seen ${moment(user.lastSeen).calendar()}`}
            </Typography>
         </Box>
      </Stack>
   );
};
