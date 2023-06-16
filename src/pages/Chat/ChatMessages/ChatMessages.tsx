import Box from '@mui/material/Box';
import { FC, useEffect } from 'react';
import { useChatContext } from 'src/hooks/useChatContext';
import { useScroll } from 'src/hooks/useScroll';
import { ChatMessagesList } from './ChatMessagesList';

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
