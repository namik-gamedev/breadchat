import { DataSnapshot, child, onValue, ref } from 'firebase/database';
import { useEffect } from 'react';
import { db } from 'src/firebase/firebase';
import { IUser } from 'src/types/types';
import { useAppDispatch } from './useAppDispatch';
import { setUsers } from 'src/store/reducers/users.reducer';
import { setUsersLoad } from 'src/store/reducers/global.reducer';

export const useUsersLoad = () => {
   const dispatch = useAppDispatch();

   const callback = (usersSnapshot: DataSnapshot) => {
      const newUsers: IUser[] = [];
      usersSnapshot.forEach((userSnapshot) => {
         const blockedUsers: string[] = [];
         const blockedUsersRef = child(userSnapshot.ref, 'blockedUsers');
         onValue(blockedUsersRef, (blockedUsersSnapshot) => {
            blockedUsersSnapshot.forEach((blockedUserSnapshot) => {
               blockedUsers.push(blockedUserSnapshot.val());
            });
         });

         const user: IUser = { ...userSnapshot.val(), blockedUsers };

         newUsers.push(user);
      });
      dispatch(setUsers(newUsers));
      dispatch(setUsersLoad(true));
   };

   useEffect(() => {
      const usersRef = ref(db, 'users');
      onValue(usersRef, callback);
   }, []);
};
