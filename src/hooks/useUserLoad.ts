import { useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { onAuthStateChanged } from 'firebase/auth';
import { appAuth } from 'src/firebase/firebase';
import { setUserLoad, unsetDataLoad } from 'src/store/reducers/global.reducer';
import { IUser } from 'src/types/types';
import UserService from 'src/services/user.service';
import { setUser } from 'src/store/reducers/user.reducer';

export const useUserLoad = () => {
   const dispatch = useAppDispatch();
   useEffect(() => {
      const unsubAuthState = onAuthStateChanged(appAuth, (user) => {
         if (user) {
            // TODO: ADD HERE PHOTOURL
            const newUser: IUser = {
               displayName: user.displayName!,
               uid: user.uid,
               photoURL: user.photoURL,
               online: true,
               lastSeen: Date.now(),
               typing: false,
            };

            UserService.setOnline(user.uid, true);

            dispatch(setUser(newUser));
         } else {
            dispatch(unsetDataLoad());
         }
         dispatch(setUserLoad(true));
      });

      return unsubAuthState;
   }, []);
};
