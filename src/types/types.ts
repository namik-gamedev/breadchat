import { User } from 'firebase/auth';

export interface IUser {
   uid: string;
   displayName: string;
   photoURL?: string;
}

export interface IMessage {
   sender: number; // 0 is current user, 1 is user, we are chatting with
   text: string;
}

export interface IChat {
   messages: IMessage[];
}
