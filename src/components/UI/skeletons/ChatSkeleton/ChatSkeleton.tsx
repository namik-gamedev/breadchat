import Stack from '@mui/material/Stack';
import { FC } from 'react';
import { StyledBox } from '../../StyledBox';
import { ChatFormSkeleton } from './ChatFormSkeleton';
import { ChatHeaderSkeleton } from './ChatHeaderSkeleton';

export const ChatSkeleton: FC = () => {
   return (
      <StyledBox sx={{ p: 2, height: 1 }}>
         <Stack spacing={2} direction='column' sx={{ height: 1 }}>
            <ChatHeaderSkeleton />
            <Stack sx={{ height: 1 }} />
            <ChatFormSkeleton />
         </Stack>
      </StyledBox>
   );
};
