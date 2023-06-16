import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { FC } from 'react';
import { UserThumbnailSkeleton } from '../../UserThumbnailSkeleton';

export interface ChatHeaderSkeletonProps {}

export const ChatHeaderSkeleton: FC<ChatHeaderSkeletonProps> = ({}) => {
   return (
      <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
         <UserThumbnailSkeleton />
         <Skeleton variant='rounded' width={20} />
      </Stack>
   );
};
