import Stack from '@mui/material/Stack';
import { FC } from 'react';
import { StyledBox } from '../../StyledBox';
import { ChatHeaderSkeleton } from '../ChatSkeleton/ChatHeaderSkeleton';
import { AboutUserSkeleton } from './AboutUserSkeleton';

export interface AccountSkeletonProps {}

export const AccountSkeleton: FC<AccountSkeletonProps> = ({}) => {
   return (
      <Stack component={StyledBox} spacing={2} sx={{ p: 2, height: 1 }}>
         <ChatHeaderSkeleton />
         <AboutUserSkeleton />
      </Stack>
   );
};
