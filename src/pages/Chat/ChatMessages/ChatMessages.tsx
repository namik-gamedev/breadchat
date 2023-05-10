import React, { FC, createRef, useEffect, useRef, useState } from 'react';
import Stack from '@mui/material/Stack';
import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IChat, IMessage, IUser } from 'src/types/types';
import { ChatMessage } from '../ChatMessage/ChatMessage';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { useScroll } from 'src/hooks/useScroll';
import { StyledBox } from 'src/components/UI/StyledBox';

export interface ChatMessagesProps {
   chat: IChat | undefined;
}

export const ChatMessages: FC<ChatMessagesProps> = ({ chat }) => {
   const { ref, scroll } = useScroll<HTMLDivElement>();

   useEffect(() => {
      scroll();
   }, [chat?.messages]);
   console.log(chat);

   return (
      <Box ref={ref} sx={{ overflow: 'auto' }}>
         {chat && chat.messages.length > 0 ? (
            <Stack
               sx={{
                  p: 1,
               }}
            >
               {chat?.messages.map((message) => {
                  return <ChatMessage interlocutor={chat?.interlocutor} message={message} key={message.createdAt} />;
               })}
            </Stack>
         ) : (
            <Typography sx={{ textAlign: 'center', p: 2 }} variant='body1'>
               No messages in chat ;(
            </Typography>
         )}
      </Box>
   );
};
