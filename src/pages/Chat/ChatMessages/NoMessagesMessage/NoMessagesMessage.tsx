import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { Trans } from 'react-i18next';

export const NoMessagesMessage: FC = () => {
   return (
      <Stack sx={{ justifyContent: 'center', alignItems: 'center', height: 1 }}>
         <Typography variant='body1'>
            <Trans>no messages</Trans>
         </Typography>
      </Stack>
   );
};
