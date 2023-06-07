import { User } from 'firebase/auth';

export interface IUser {
   uid: string;
   displayName: string;
   photoURL?: string | null;
   about?: string;
   online: boolean;
   lastSeen: number;
   blockedUsers: string[];
}

export interface IMessage {
   sender: number; // 0 is current user, 1 is user, we are chatting with
   text: string;
   createdAt: number;
   edited: boolean;
}

export interface IChat {
   interlocutor: IUser;
   messages: IMessage[];
   unreadedMessagesCount: number; // count of not readed messages from interlocutor
   selfUnreadedMessagesCount: number; // count of not readed by interlocutor messages
   interlocutorTyping: boolean;
}
