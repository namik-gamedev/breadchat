import React, { FC } from 'react';
import { StyledBox } from '../../StyledBox';
import Stack from '@mui/material/Stack';
import { ChatHeaderSkeleton } from './ChatHeaderSkeleton';
import { ChatFormSkeleton } from './ChatFormSkeleton';
import SendIcon from '@mui/icons-material/Send';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import TextField from '@mui/material/TextField';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useTranslation } from 'react-i18next';
import { BrowserView } from 'react-device-detect';
import { ChatEmojiPicker } from 'src/pages/Chat/ChatForm/ChatEmojiPicker';

export interface ChatSkeletonProps {}

export const ChatSkeleton: FC<ChatSkeletonProps> = ({}) => {
   const { t } = useTranslation();

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
