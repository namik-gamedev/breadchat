import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { appAuth, db } from 'src/firebase/firebase';
import UserService from 'src/services/user.service';
import { setChatsLoad, setUserLoad } from 'src/store/reducers/global.reducer';
import { setUser, unsetUser } from 'src/store/reducers/user.reducer';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { onValue, ref, set } from 'firebase/database';

export const useUserLoad = () => {
   const [authorizedUserUid, setAuthorizedUserUid] = useState<string | undefined>();

   const users = useAppSelector((state) => state.users.data);

   const dispatch = useAppDispatch();

   useEffect(() => {
      const unsubAuthState = onAuthStateChanged(appAuth, async (user) => {
         setAuthorizedUserUid(user?.uid);
         if (user) {
            UserService.setOnline(user.uid, true);
         } else {
            dispatch(setChatsLoad(false));
            dispatch(unsetUser());
         }
         dispatch(setUserLoad(true));
      });

      return unsubAuthState;
   }, []);

   useEffect(() => {
      if (!users) {
         return;
      }

      if (authorizedUserUid) {
         const user = users.find((u) => u.uid === authorizedUserUid)!;
         dispatch(setUser(user));

         const userOnlineRef = ref(db, `users/${authorizedUserUid}/online`);
         const unsub = onValue(userOnlineRef, (snapshot) => {
            const online = snapshot.val();

            if (!online) {
               set(userOnlineRef, true);
            }
         });

         return unsub;
      }
   }, [users, authorizedUserUid]);
};
