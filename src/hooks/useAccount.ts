import { createContext, useContext } from 'react';
import { IAccountContext } from 'src/types/types';

const accountContextDefaultValue: IAccountContext = {
   user: undefined,
   isCurrentUser: false,
   isUserBlocked: false,
   isSelfBlockedByUser: false,
};

export const AccountContext = createContext(accountContextDefaultValue);

export const useAccount = () => useContext(AccountContext);
