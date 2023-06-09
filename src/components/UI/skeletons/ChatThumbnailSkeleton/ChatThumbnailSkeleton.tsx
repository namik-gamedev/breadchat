import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

export const ChatThumbnailSkeleton: FC = () => {
   return (
      <Stack sx={{ width: 1 }} direction='row' spacing={2} alignItems='center'>
         <Skeleton variant='circular'>
            <Avatar sx={{ width: 50, height: 50 }} />
         </Skeleton>
         <Box sx={{ width: 1 }}>
            <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
               <Typography variant='h6'>
                  <Skeleton width={120} />
               </Typography>
               <Typography variant='body1'>
                  <Skeleton width={40} />
               </Typography>
            </Stack>

            <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
               <Typography variant='body1'>
                  <Skeleton width={50} />
               </Typography>
               <Skeleton variant='circular' width={18} height={18} />
            </Stack>
         </Box>
      </Stack>
   );
};
