import { useUsersLoad } from './useUsersLoad';
import { useChatsLoad } from './useChatsLoad';
import { useUserLoad } from './useUserLoad';

export const useDBSetup = () => {
   useUserLoad();
   useUsersLoad();
   useChatsLoad();
};
