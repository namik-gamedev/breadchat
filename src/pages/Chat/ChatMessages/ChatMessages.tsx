import React, { FC } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { IChat, IMessage, IUser } from 'src/types/types';
import { ChatMessage } from '../ChatMessage/ChatMessage';

export interface ChatMessagesProps {
   messages: IMessage[];
}

export const ChatMessages: FC<ChatMessagesProps> = ({ messages }) => {
   // TODO: replace the key with created at time
   return (
      <Stack spacing={1}>
         {messages.map((message, i) => (
            <ChatMessage
               prevSender={messages[i - 1] ? messages[i - 1].sender : -1}
               nextSender={messages[i + 1] ? messages[i + 1].sender : -1}
               message={message}
               key={i}
            />
         ))}
      </Stack>
   );
};
