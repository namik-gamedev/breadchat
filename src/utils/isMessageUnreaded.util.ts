import { IChat, IMessage } from 'src/types/types';

export const isMessageUnreaded = (chat: IChat, message: IMessage) => {
   const index = chat.messages.findIndex((msg) => msg.createdAt === message.createdAt);
   return chat.messages.length - index <= chat.selfUnreadedMessagesCount;
};
