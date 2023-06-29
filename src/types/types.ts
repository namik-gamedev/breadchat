import { Dispatch, SetStateAction } from 'react';

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
   text: string | undefined;
   createdAt: number;
   edited: boolean;
   images?: string[] | null;
}

export interface IChat {
   interlocutorUid: string;
   messages: IMessage[];
   unreadedMessagesCount: number; // count of not readed messages from interlocutor
   selfUnreadedMessagesCount: number; // count of not readed by interlocutor messages
   interlocutorTyping: boolean;
}

export enum IUsersShowType {
   ONLINE,
   ALL,
}

export enum ISearchBy {
   NAME,
   ID,
}

export interface IUsersFilter {
   searchQuery: string;
   setSearchQuery: Dispatch<SetStateAction<string>>;
   filteredUsers: IUser[];
   setFilteredUsers: Dispatch<SetStateAction<IUser[]>>;
   usersShowType: IUsersShowType;
   setUsersShowType: Dispatch<SetStateAction<IUsersShowType>>;
}

export interface IAccountContext {
   user: IUser | undefined;
   isCurrentUser: boolean;
   isUserBlocked: boolean;
   isSelfBlockedByUser: boolean;
}

export interface IChatContext {
   chat: IChat | undefined;
   interlocutor: IUser | undefined;
   editingMessage: IMessage | null;
   setEditingMessage: Dispatch<SetStateAction<IMessage | null>>;
   isSelfBlockedByInterlocutor: boolean;
   isInterlocutorBlocked: boolean;
}

export enum ILanguage {
   EN = 'en',
   RU = 'ru',
}

export interface IDataLoad {
   user: boolean;
   users: boolean;
   chats: boolean;
}

export interface ISignInValues {
   email: string;
   password: string;
}

export interface ISignUpValues {
   name: string;
   email: string;
   password: string;
   confirmPassword: string;
}

export type IAuthTab = 'signIn' | 'signUp';
