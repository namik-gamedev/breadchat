import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { Trans } from 'react-i18next';
import errorImg from 'src/assets/img/404.png';

export const NotFound: FC = () => {
   return (
      <Stack spacing={1} alignItems='center'>
         <Box
            component='img'
            sx={{
               width: {
                  lg: 600,
                  md: 550,
                  sm: 480,
                  xs: 300,
               },
            }}
            src={errorImg}
         />
         <Typography
            sx={{
               fontSize: {
                  sm: '5em',
                  xs: '3em',
               },
            }}
            variant='h2'
         >
            <Trans>oops</Trans>
         </Typography>
         <Typography
            sx={{
               fontSize: {
                  sm: '1.2em',
                  xs: '0.9em',
               },
               letterSpacing: 1,
               fontWeight: 300,
            }}
         >
            <Trans>we couldn't find that page</Trans>
         </Typography>
      </Stack>
   );
};
