import React, { FC } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CreateIcon from '@mui/icons-material/Create';
import { Trans } from 'react-i18next';
import { IUser } from 'src/types/types';

export interface AboutUserProps {
   user: IUser;
   isCurrentUser: boolean;
   handleFormShow: () => void;
}

export const AboutUser: FC<AboutUserProps> = ({ user, isCurrentUser, handleFormShow }) => {
   return (
      <Stack direction='row' sx={{ justifyContent: 'space-between' }}>
         <Box>
            <Typography variant='body1' color='text.secondary'>
               <Trans>about user</Trans>
            </Typography>
            <Typography variant='h6' sx={{ fontWeight: 'normal' }}>
               <Trans>{user?.about || 'about user'}</Trans>
            </Typography>
         </Box>
         {isCurrentUser && (
            <Box>
               <IconButton onClick={handleFormShow}>
                  <CreateIcon color='primary' />
               </IconButton>
            </Box>
         )}
      </Stack>
   );
};
