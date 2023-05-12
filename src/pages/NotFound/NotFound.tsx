import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { UnstyledLink } from 'src/components/UI/UnstyledLink';
import errorImg from 'src/assets/img/404.png';

export interface NotFoundProps {}

export const NotFound: FC<NotFoundProps> = ({}) => {
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
            Oops...
         </Typography>
         <Typography
            sx={{
               fontSize: {
                  sm: '1.2em',
                  xs: '0.9em',
               },
               letterSpacing: 1,
               fontWeight: 300,
               color: 'text.secondary',
            }}
         >
            We couldn't find that page.
         </Typography>
         {/* <UnstyledLink to='/'>
            <Button size='large' variant='contained'>
               Home
            </Button>
         </UnstyledLink> */}
      </Stack>
   );
};
