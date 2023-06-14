import { User } from 'firebase/auth';
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

export enum UsersShowType {
   ONLINE,
   ALL,
}

export enum SearchBy {
   NAME,
   ID,
}

export interface UsersContextType {
   searchQuery: string;
   setSearchQuery: Dispatch<SetStateAction<string>>;
   filteredUsers: IUser[];
   setFilteredUsers: Dispatch<SetStateAction<IUser[]>>;
   usersShowType: UsersShowType;
   setUsersShowType: Dispatch<SetStateAction<UsersShowType>>;
}

export interface AccountContextType {
   user: IUser | undefined;
   isCurrentUser: boolean;
   isUserBlocked: boolean;
   isSelfBlockedByUser: boolean;
}
