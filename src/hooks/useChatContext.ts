import { useContext } from 'react';
import { ChatContext } from 'src/contexts/chat.context';

export const useChatContext = () => useContext(ChatContext);
