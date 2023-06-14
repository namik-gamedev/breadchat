import React, { FC } from 'react';
import { AccountContext } from 'src/contexts/account.context';
import { IAccountContext } from 'src/types/types';

export interface AccountProviderProps {
   value: IAccountContext;
   children?: React.ReactNode;
}

export const AccountProvider: FC<AccountProviderProps> = (props) => <AccountContext.Provider {...props} />;
