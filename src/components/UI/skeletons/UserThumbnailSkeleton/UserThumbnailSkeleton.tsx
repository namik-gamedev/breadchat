import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

export const UserThumbnailSkeleton: FC = () => {
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
