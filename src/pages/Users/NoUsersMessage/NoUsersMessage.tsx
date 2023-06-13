import React, { FC } from 'react';
import { Trans } from 'react-i18next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export interface NoUsersMessageProps {
   isSearchQueryEmpty: boolean;
}

export const NoUsersMessage: FC<NoUsersMessageProps> = ({ isSearchQueryEmpty }) => {
   return (
      <Stack sx={{ justifyContent: 'center', alignItems: 'center', height: 1 }}>
         <Typography variant='body1'>
            <Trans>{isSearchQueryEmpty ? 'no users online' : 'no users found'}</Trans>
         </Typography>
      </Stack>
   );
};
