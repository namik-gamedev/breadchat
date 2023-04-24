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

export interface UserThumbnailProps {
   user: IUser;
}

export const UserThumbnail: FC<UserThumbnailProps> = ({ user }) => {
   const { displayName, uid } = user;

   return (
      <Stack spacing={1.5}>
         <Stack alignItems='center' spacing={{ sm: 1, xs: 2 }} direction={{ sm: 'column', xs: 'row' }}>
            <UserAvatar
               variant='rounded'
               withoutBadge
               sx={{
                  fontSize: {
                     lg: '4em',
                     md: '5em',
                     sm: '5em',
                     xs: '1.8em',
                  },
                  aspectRatio: '1/1',
                  width: {
                     sm: 1,
                     xs: 0.19,
                  },
                  height: '',
               }}
               user={user}
            />
            <Box textAlign={{ sm: 'center' }}>
               <Typography variant='h5' sx={{ letterSpacing: 1, lineBreak: 'anywhere' }}>
                  {displayName}
               </Typography>
               <Typography variant='body1' sx={{ color: 'grey' }}>
                  {Math.round(Math.random()) > 0.5 ? 'Online' : 'Was online at 01:46 PM'}
               </Typography>
            </Box>
         </Stack>
         <UnstyledLink to={'/chat/' + uid}>
            <Button variant='contained' fullWidth endIcon={<ForumIcon />}>
               Chat
            </Button>
         </UnstyledLink>
      </Stack>
   );
};
