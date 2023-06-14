import React, { FC } from 'react';
import { ChatContext } from 'src/contexts/chat.context';
import { IChatContext } from 'src/types/types';

export interface ChatProviderProps {
   value: IChatContext;
   children?: React.ReactNode;
}

export const ChatProvider: FC<ChatProviderProps> = (props) => <ChatContext.Provider {...props} />;
