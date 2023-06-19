import { useContext } from 'react';
import { UsersFilter } from 'src/contexts/users.context';

export const useUsersFilter = () => useContext(UsersFilter);
