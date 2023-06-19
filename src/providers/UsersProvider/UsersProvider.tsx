import React, { FC } from 'react';
import { UsersFilter } from 'src/contexts/users.context';
import { IUsersFilter } from 'src/types/types';

interface Props {
   value: IUsersFilter;
   children?: React.ReactNode;
}

export const UsersProvider: FC<Props> = (props) => <UsersFilter.Provider {...props} />;
