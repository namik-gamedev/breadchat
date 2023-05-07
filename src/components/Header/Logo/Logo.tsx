import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { UnstyledLink } from 'src/components/UI/UnstyledLink';
import Tooltip from '@mui/material/Tooltip';

export interface LogoProps {}

export const Logo: FC<LogoProps> = ({}) => {
   return (
      <UnstyledLink to='/'>
         <Stack spacing={1} alignItems='center' component='a' direction='row'>
            <Tooltip title='BREAD' arrow>
               <Stack direction='row'>
                  <Typography
                     component='h1'
                     sx={{
                        color: 'primary.main',
                        letterSpacing: 4,
                     }}
                     variant='h6'
                  >
                     BREAD
                  </Typography>
                  <Typography sx={{ display: { sm: 'block', xs: 'none' } }} variant='h6'>
                     chat
                  </Typography>
               </Stack>
            </Tooltip>
         </Stack>
      </UnstyledLink>
   );
};
