import { useEffect, useState } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { onAuthStateChanged } from 'firebase/auth';
import { appAuth, db } from 'src/firebase/firebase';
import { setUserLoad, unsetDataLoad } from 'src/store/reducers/global.reducer';
import { IUser } from 'src/types/types';
import UserService from 'src/services/user.service';
import { setUser } from 'src/store/reducers/user.reducer';
import { get, onValue, ref } from 'firebase/database';
import { useAppSelector } from './useAppSelector';

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
            dispatch(unsetDataLoad());
         }
         dispatch(setUserLoad(true));
      });

      return () => {
         unsubAuthState();
      };
   }, []);

   useEffect(() => {
      if (!users) {
         return;
      }

      if (authorizedUserUid) {
         const user = users.find((u) => u.uid === authorizedUserUid)!;
         dispatch(setUser(user));
      }
   }, [users, authorizedUserUid]);
};
