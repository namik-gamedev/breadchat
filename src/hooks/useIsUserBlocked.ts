import { useAppSelector } from './useAppSelector';

export const useIsUserBlocked = (userUid: string | undefined, blockedByUid: string | undefined) => {
   const user = useAppSelector((state) => state.users.data).find((u) => u.uid === userUid)!;
   const blockedBy = useAppSelector((state) => state.users.data).find((u) => u.uid === blockedByUid)!;

   if (!user || !blockedBy) {
      return false;
   }

   return blockedBy.blockedUsers.some((uid) => uid === user.uid);
};
