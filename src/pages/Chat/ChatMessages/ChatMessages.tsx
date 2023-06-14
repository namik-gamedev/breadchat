import React, { Dispatch, FC, SetStateAction, createRef, useContext, useEffect, useRef, useState } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { IChat, IMessage, IUser } from 'src/types/types';
import { ChatMessage } from '../ChatMessage/ChatMessage';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { useScroll } from 'src/hooks/useScroll';
import { StyledBox } from 'src/components/UI/StyledBox';
import { Trans } from 'react-i18next';
import { NoMessagesMessage } from './NoMessagesMessage';
import { ChatMessagesList } from './ChatMessagesList';
import { useChatContext } from 'src/hooks/useChatContext';

export interface ChatMessagesProps {}

export const ChatMessages: FC<ChatMessagesProps> = ({}) => {
   const { ref, scroll } = useScroll<HTMLDivElement>();

   const { chat } = useChatContext();

   useEffect(() => {
      scroll();
   }, [chat?.messages]);

   return (
      <Box ref={ref} sx={{ height: 1, overflow: 'auto' }}>
         <ChatMessagesList />
      </Box>
   );
};
