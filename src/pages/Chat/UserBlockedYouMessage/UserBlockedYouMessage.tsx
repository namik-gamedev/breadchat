import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Trans } from 'react-i18next';

export interface UserBlockedYouMessageProps {}

export const UserBlockedYouMessage: FC<UserBlockedYouMessageProps> = ({}) => {
   return (
      <Stack sx={{ height: 1, overflow: 'auto' }}>
         <Stack sx={{ justifyContent: 'center', height: 1 }}>
            <Typography variant='body1' textAlign='center'>
               <Trans>user blocked you</Trans>
            </Typography>
         </Stack>
      </Stack>
   );
};
