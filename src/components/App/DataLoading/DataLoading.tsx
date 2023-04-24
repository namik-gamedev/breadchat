import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export interface DataLoadingProps {}

export const DataLoading: FC<DataLoadingProps> = ({}) => {
   return (
      <Stack alignItems='center' spacing={3} sx={{ pt: '30vh' }}>
         <CircularProgress size={70} />
         <Typography variant='h5' textAlign='center'>
            Please, wait for few seconds!
         </Typography>
         <Typography variant='body1' sx={{ color: 'grey', letterSpacing: 1 }} textAlign='center'>
            We're just trying to load a data before you'll see all the content ;)
         </Typography>
      </Stack>
   );
};
