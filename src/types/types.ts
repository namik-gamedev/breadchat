import { User } from 'firebase/auth';

export interface IUser {
   uid: string;
   displayName: string;
   photoURL?: string | null;
}

export interface IUserWithDBFields extends IUser {
   online: boolean;
   lastSeen: number;
   typing: boolean;
}

export interface IMessage {
   sender: number; // 0 is current user, 1 is user, we are chatting with
   text: string;
   createdAt: number;
}

export interface IChat {
   interlocutor: IUser;
   messages: IMessage[];
}
