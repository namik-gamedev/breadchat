import { createContext, useContext } from 'react';
import { IChatContext } from 'src/types/types';

const chatContextInitialValue: IChatContext = {
   chat: undefined,
   interlocutor: undefined,
   editingMessage: null,
   setEditingMessage: () => {},
   isSelfBlockedByInterlocutor: false,
   isInterlocutorBlocked: false,
};

export const ChatContext = createContext(chatContextInitialValue);

export const useChat = () => useContext(ChatContext);
