import { createContext } from 'react';
import { IUsersContext, UsersShowType } from 'src/types/types';

const usersContextInitialValue: IUsersContext = {
   searchQuery: '',
   setSearchQuery: () => {},
   filteredUsers: [],
   setFilteredUsers: () => {},
   usersShowType: UsersShowType.ONLINE,
   setUsersShowType: () => {},
};

export const UsersContext = createContext(usersContextInitialValue);
