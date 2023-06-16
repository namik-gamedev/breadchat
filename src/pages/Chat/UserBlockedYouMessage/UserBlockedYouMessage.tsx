import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { Trans } from 'react-i18next';

export interface UserBlockedYouMessageProps {}

export const UserBlockedYouMessage: FC<UserBlockedYouMessageProps> = ({}) => {
   return (
      <Stack sx={{ height: 1, overflow: 'auto' }}>
         <Stack sx={{ justifyContent: 'center', height: 1 }}>
            <Typography variant='body1' textAlign='center'>
               <Trans>you are blocked</Trans>
            </Typography>
         </Stack>
      </Stack>
   );
};
