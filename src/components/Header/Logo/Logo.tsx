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
            <Tooltip title='Bread chat' arrow>
               <Typography component='h1' variant='h6' aria-label='bread'>
                  <Typography
                     component='span'
                     sx={{
                        color: 'primary.main',
                        letterSpacing: 4,
                     }}
                     variant='h6'
                  >
                     BRE🍞D
                  </Typography>
                  chat
               </Typography>
            </Tooltip>
         </Stack>
      </UnstyledLink>
   );
};
