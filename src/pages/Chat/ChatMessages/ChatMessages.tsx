import Box from '@mui/material/Box';
import { FC, useEffect } from 'react';
import { useChat } from 'src/hooks/useChat';
import { useScroll } from 'src/hooks/useScroll';
import { ChatMessagesList } from './ChatMessagesList';

export const ChatMessages: FC = () => {
   const { ref, scroll } = useScroll<HTMLDivElement>();

   const { chat } = useChat();

   useEffect(() => {
      scroll();
   }, [chat?.messages.length]);

   return (
      <Box ref={ref} sx={{ height: 1, overflow: 'auto' }}>
         <ChatMessagesList />
      </Box>
   );
};
