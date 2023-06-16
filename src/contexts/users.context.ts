import { createContext } from 'react';
import { IUsersContext, IUsersShowType } from 'src/types/types';

const usersContextInitialValue: IUsersContext = {
   searchQuery: '',
   setSearchQuery: () => {},
   filteredUsers: [],
   setFilteredUsers: () => {},
   usersShowType: IUsersShowType.ONLINE,
   setUsersShowType: () => {},
};

export const UsersContext = createContext(usersContextInitialValue);
