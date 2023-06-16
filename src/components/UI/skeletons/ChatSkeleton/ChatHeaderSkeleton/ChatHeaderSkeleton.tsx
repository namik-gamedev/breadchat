import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { FC } from 'react';
import { UserThumbnailSkeleton } from '../../UserThumbnailSkeleton';

export const ChatHeaderSkeleton: FC = () => {
   return (
      <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
         <UserThumbnailSkeleton />
         <Skeleton variant='rounded' width={20} />
      </Stack>
   );
};
