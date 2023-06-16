import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

export interface AboutUserSkeletonProps {}

export const AboutUserSkeleton: FC<AboutUserSkeletonProps> = ({}) => {
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
