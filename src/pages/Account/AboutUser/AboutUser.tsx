import React, { FC, useContext } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CreateIcon from '@mui/icons-material/Create';
import { Trans } from 'react-i18next';
import { IUser } from 'src/types/types';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { useIsUserBlocked } from 'src/hooks/useIsUserBlocked';
import { current } from '@reduxjs/toolkit';
import { AccountContext } from '../Account';

export interface AboutUserProps {
   handleFormShow: () => void;
}

export const AboutUser: FC<AboutUserProps> = ({ handleFormShow }) => {
   const currentUser = useAppSelector((state) => state.user.data);

   const { isCurrentUser, isSelfBlockedByUser } = useContext(AccountContext);
   const user = useContext(AccountContext).user!;

   return (
      <Stack direction='row' sx={{ justifyContent: 'space-between' }}>
         <Box>
            <Typography variant='body1' color='text.secondary'>
               <Trans>about user</Trans>
            </Typography>
            <Typography variant='h6' sx={{ fontWeight: 'normal' }}>
               <Trans>{(!isSelfBlockedByUser && user.about) || 'about user'}</Trans>
            </Typography>
         </Box>
         {isCurrentUser && (
            <Box>
               <IconButton onClick={handleFormShow}>
                  <CreateIcon />
               </IconButton>
            </Box>
         )}
      </Stack>
   );
};
