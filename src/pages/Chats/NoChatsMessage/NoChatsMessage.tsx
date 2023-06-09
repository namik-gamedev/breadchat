import React, { FC } from 'react';
import { Trans } from 'react-i18next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export interface NoChatsMessageProps {}

export const NoChatsMessage: FC<NoChatsMessageProps> = ({}) => {
   return (
      <Stack sx={{ justifyContent: 'center', alignItems: 'center', height: 1 }}>
         <Typography variant='body1'>
            <Trans>no chats</Trans>
         </Typography>
      </Stack>
   );
};
