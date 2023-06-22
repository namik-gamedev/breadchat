import React, { FC } from 'react';
import { ChatContext } from 'src/hooks/useChat';
import { IChatContext } from 'src/types/types';

interface Props {
   value: IChatContext;
   children?: React.ReactNode;
}

export const ChatProvider: FC<Props> = (props) => <ChatContext.Provider {...props} />;
