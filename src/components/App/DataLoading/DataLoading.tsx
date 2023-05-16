import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Trans } from 'react-i18next';

export interface DataLoadingProps {}

export const DataLoading: FC<DataLoadingProps> = ({}) => {
   return (
      <Stack alignItems='center' spacing={3} sx={{ pt: '30vh' }}>
         <CircularProgress size={70} />
         <Typography variant='h5' textAlign='center'>
            <Trans>wait for few seconds</Trans>
         </Typography>
         <Typography variant='body1' sx={{ letterSpacing: 1, textAlign: 'center' }}>
            <Trans>we're trying to load a data</Trans>
         </Typography>
      </Stack>
   );
};
