import React, { FC } from 'react';
import { UsersContext } from 'src/contexts/users.context';
import { IUsersContext } from 'src/types/types';

export interface UsersProviderProps {
   value: IUsersContext;
   children?: React.ReactNode;
}

export const UsersProvider: FC<UsersProviderProps> = (props) => <UsersContext.Provider {...props} />;
