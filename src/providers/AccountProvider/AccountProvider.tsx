import React, { FC } from 'react';
import { AccountContext } from 'src/contexts/account.context';
import { IAccountContext } from 'src/types/types';

interface Props {
   value: IAccountContext;
   children?: React.ReactNode;
}

export const AccountProvider: FC<Props> = (props) => <AccountContext.Provider {...props} />;
