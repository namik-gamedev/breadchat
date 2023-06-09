import React, { Dispatch, FC, SetStateAction, useContext } from 'react';
import Stack from '@mui/material/Stack';
import { IChat, IMessage } from 'src/types/types';
import { ChatMessage } from '../../ChatMessage/ChatMessage';
import { ChatContext } from '../../Chat';
import { NoMessagesMessage } from '../NoMessagesMessage';

export interface ChatMessagesListProps {}

export const ChatMessagesList: FC<ChatMessagesListProps> = () => {
   const { chat } = useContext(ChatContext);

   return chat ? (
      <Stack
         spacing={0.2}
         sx={{
            p: 1,
         }}
      >
         {chat?.messages.map((message) => {
            return <ChatMessage message={message} key={message.createdAt} />;
         })}
      </Stack>
   ) : (
      <NoMessagesMessage />
   );
};
