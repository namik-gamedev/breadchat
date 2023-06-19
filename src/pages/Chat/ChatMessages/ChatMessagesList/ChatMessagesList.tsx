import Stack from '@mui/material/Stack';
import moment from 'moment';
import { FC } from 'react';
import { useChatContext } from 'src/hooks/useChatContext';
import { ChatDate } from '../../ChatDate';
import { ChatMessage } from '../../ChatMessage/ChatMessage';
import { NoMessagesMessage } from '../NoMessagesMessage';

export const ChatMessagesList: FC = () => {
   const { chat } = useChatContext();

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
