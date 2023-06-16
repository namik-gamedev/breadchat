import React, { FC } from 'react';
import { ChatContext } from 'src/contexts/chat.context';
import { IChatContext } from 'src/types/types';

interface Props {
   value: IChatContext;
   children?: React.ReactNode;
}

export const ChatProvider: FC<Props> = (props) => <ChatContext.Provider {...props} />;
