import React, { FC, createRef, useEffect, useRef, useState } from 'react';
import Stack from '@mui/material/Stack';
import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IChat, IMessage, IUser, IUserWithDBFields } from 'src/types/types';
import { ChatMessage } from '../ChatMessage/ChatMessage';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { useScroll } from 'src/hooks/useScroll';
import { StyledBox } from 'src/components/UI/StyledBox';

export interface ChatMessagesProps {
   interlocutor: IUserWithDBFields;
}

export const ChatMessages: FC<ChatMessagesProps> = ({ interlocutor }) => {
   const chat = useAppSelector((state) => state.chats.data)!.find((chat) => chat.interlocutor.uid === interlocutor.uid)!;

   const { messages } = chat;

   const { ref, scroll } = useScroll<HTMLDivElement>();

   useEffect(() => {
      scroll();
   }, [messages]);

   return (
      <StyledBox ref={ref} sx={{ overflow: 'auto' }}>
         {messages.length > 0 ? (
            <Stack
               spacing={1}
               sx={{
                  p: 2,
               }}
            >
               {messages.map((message) => {
                  return <ChatMessage interlocutor={interlocutor} message={message} key={message.createdAt} />;
               })}
            </Stack>
         ) : (
            <Typography sx={{ textAlign: 'center', p: 2 }} variant='body1'>
               No messages in chat ;(
            </Typography>
         )}
      </StyledBox>
   );
};
