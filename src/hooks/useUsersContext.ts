import { useContext } from 'react';
import { UsersContext } from 'src/contexts/users.context';

export const useUsersContext = () => useContext(UsersContext);
