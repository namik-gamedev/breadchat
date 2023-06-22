import { createContext, useContext } from 'react';
import { IUsersFilter, IUsersShowType } from 'src/types/types';

const usersFilterInitialValue: IUsersFilter = {
   searchQuery: '',
   setSearchQuery: () => {},
   filteredUsers: [],
   setFilteredUsers: () => {},
   usersShowType: IUsersShowType.ONLINE,
   setUsersShowType: () => {},
};

export const UsersFilter = createContext(usersFilterInitialValue);

export const useUsersFilter = () => useContext(UsersFilter);
