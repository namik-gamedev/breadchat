import { useContext } from 'react';
import { ChatContext } from 'src/contexts/chat.context';

export const useChat = () => useContext(ChatContext);
