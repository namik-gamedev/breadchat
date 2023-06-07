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
import { IUser } from 'src/types/types';
import { UnstyledLink } from 'src/components/UI/UnstyledLink';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { UserOnlineStatus } from '../UserOnlineStatus';

export interface UserThumbnailProps {
   goToChatOnClick?: boolean;
   user: IUser;
}

export const UserThumbnail: FC<UserThumbnailProps> = ({ goToChatOnClick = false, user }) => {
   const navigate = useNavigate();
   const currentUser = useAppSelector((state) => state.user.data)!;
   const isUserBlocked = currentUser.blockedUsers.some((uid) => uid === user.uid);

   const handleClick = () => {
      navigate(`/chat/${user.uid}`);
   };

   return (
      <Stack
         onClick={goToChatOnClick ? handleClick : undefined}
         sx={{ cursor: goToChatOnClick ? 'pointer' : 'default' }}
         direction='row'
         spacing={2}
         alignItems='center'
      >
         <UserAvatar sx={{ width: 50, height: 50, fontSize: '1.5em' }} user={user} />
         <Box>
            <Typography variant='h6' sx={{ fontWeight: 'normal' }} component='h2'>
               {user.displayName}
            </Typography>
            <Typography variant='body1' sx={{ color: 'text.secondary' }}>
               <UserOnlineStatus user={user} />
            </Typography>
         </Box>
      </Stack>
   );
};
