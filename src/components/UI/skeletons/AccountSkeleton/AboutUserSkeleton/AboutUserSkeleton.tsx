import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

export const AboutUserSkeleton: FC = () => {
   return (
      <Stack>
         <Typography variant='body1'>
            <Skeleton width={60} />
         </Typography>
         <Typography variant='h6'>
            <Skeleton width={200} />
         </Typography>
      </Stack>
   );
};
