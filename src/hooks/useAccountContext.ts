import { useContext } from 'react';
import { AccountContext } from 'src/contexts/account.context';

export const useAccountContext = () => useContext(AccountContext);
