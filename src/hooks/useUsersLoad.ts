import { DataSnapshot, child, onValue, ref } from 'firebase/database';
import { useEffect } from 'react';
import { db } from 'src/firebase/firebase';
import { setUsersLoad } from 'src/store/reducers/global.reducer';
import { setUsers } from 'src/store/reducers/users.reducer';
import { IUser } from 'src/types/types';
import { useAppDispatch } from './useAppDispatch';

export const useUsersLoad = () => {
   const dispatch = useAppDispatch();

   const callback = (usersSnapshot: DataSnapshot) => {
      let users: IUser[] = [];
      usersSnapshot.forEach((userSnapshot) => {
         let blockedUsers: string[] = [];
         const blockedUsersRef = child(userSnapshot.ref, 'blockedUsers');
         onValue(blockedUsersRef, (blockedUsersSnapshot) => {
            blockedUsersSnapshot.forEach((blockedUserSnapshot) => {
               blockedUsers = [...blockedUsers, blockedUserSnapshot.val()];
            });
         });

         const user: IUser = { ...userSnapshot.val(), blockedUsers };

         users = [...users, user];
      });
      dispatch(setUsers(users));
      dispatch(setUsersLoad(true));
   };

   useEffect(() => {
      const usersRef = ref(db, 'users');
      onValue(usersRef, callback);
   }, []);
};
