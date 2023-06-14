import React, { Dispatch, FC, SetStateAction, useContext } from 'react';
import Stack from '@mui/material/Stack';
import { IChat, IMessage } from 'src/types/types';
import { ChatMessage } from '../../ChatMessage/ChatMessage';
import { NoMessagesMessage } from '../NoMessagesMessage';
import moment from 'moment';
import { ChatDate } from '../../ChatDate';
import { useChatContext } from 'src/hooks/useChatContext';

export interface ChatMessagesListProps {}

export const ChatMessagesList: FC<ChatMessagesListProps> = () => {
   const chat = useChatContext().chat!;

   return chat ? (
      <Stack
         spacing={0.5}
         sx={{
            p: 1,
         }}
      >
         {chat.messages.map((message, index) => {
            const prevMessage = chat.messages[index - 1];
            const date = moment(message.createdAt);
            const prevDate = moment(prevMessage?.createdAt);

            return (
               <>
                  {(date.dayOfYear() !== prevDate.dayOfYear() || date.year() !== prevDate.year()) && <ChatDate date={date} />}
                  <ChatMessage message={message} key={message.createdAt} />
               </>
            );
         })}
      </Stack>
   ) : (
      <NoMessagesMessage />
   );
};
