import { updateProfile } from 'firebase/auth';
import { get, orderByKey, orderByValue, push, query, ref, set } from 'firebase/database';
import { appAuth, db } from 'src/firebase/firebase';
import { IUser } from 'src/types/types';

export const setupAdminAccount = async () => {
   const usersRef = query(ref(db, 'users'), orderByChild('uid'));
   const usersSnapshot = await get(usersRef);

   usersSnapshot.forEach((userSnapshot) => {
      const user: IUser = userSnapshot.val();
      if (user.uid === '__admin__') {
         return;
      }
   });
};

export const setupUserInDB = async (user: IUser) => {
   const { uid, displayName, photoURL } = user;
   await updateProfile(appAuth.currentUser!, { displayName, photoURL });

   const usersRef = ref(db, 'users');

   await push(usersRef, user);

   // admin is admin fake account uid, admin can't answer to your messages, he just can send to you first message
   // admin account is stored in firebase database
   const adminChatRef = ref(db, `chats/${uid}/admin`);
   await set(adminChatRef, [
      {
         messages: ['hi, ' + displayName],
      },
   ]);
};

export const listenUsers = async () => {};
