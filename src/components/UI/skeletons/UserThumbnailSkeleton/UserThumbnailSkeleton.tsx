import React, { FC } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export interface UserThumbnailSkeletonProps {}

export const UserThumbnailSkeleton: FC<UserThumbnailSkeletonProps> = ({}) => {
   return (
      <Stack direction='row' spacing={2} alignItems='center'>
         <Skeleton variant='circular' width={50} height={50} />
         <Box>
            <Typography variant='h6'>
               <Skeleton width={120} />
            </Typography>
            <Typography variant='body1'>
               <Skeleton width={40} />
            </Typography>
         </Box>
      </Stack>
   );
};
