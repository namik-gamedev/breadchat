import React, { FC } from 'react';
import { UsersFilter } from 'src/hooks/useUsersFilter';
import { IUsersFilter } from 'src/types/types';

interface Props {
   value: IUsersFilter;
   children?: React.ReactNode;
}

export const UsersFilterProvider: FC<Props> = (props) => <UsersFilter.Provider {...props} />;
