import React, { FC } from 'react';
import { Trans } from 'react-i18next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export interface NoMessagesMessageProps {}

export const NoMessagesMessage: FC<NoMessagesMessageProps> = ({}) => {
   return (
      <Stack sx={{ justifyContent: 'center', alignItems: 'center', height: 1 }}>
         <Typography variant='body1'>
            <Trans>no messages</Trans>
         </Typography>
      </Stack>
   );
};
