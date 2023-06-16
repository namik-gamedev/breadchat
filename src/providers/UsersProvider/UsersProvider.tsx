import React, { FC } from 'react';
import { UsersContext } from 'src/contexts/users.context';
import { IUsersContext } from 'src/types/types';

interface Props {
   value: IUsersContext;
   children?: React.ReactNode;
}

export const UsersProvider: FC<Props> = (props) => <UsersContext.Provider {...props} />;
