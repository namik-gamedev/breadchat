import { ref, set } from 'firebase/database';
import { db } from 'src/firebase/firebase';
import { IUser } from 'src/types/types';

export default class UserService {
   static async setup(user: IUser) {
      const userRef = ref(db, `users/${user.uid}`);

      await set(userRef, user);
   }
   static setOnline(uid: string, online: boolean) {
      const onlineRef = ref(db, `users/${uid}/online`);
      set(onlineRef, online);
      if (!online) {
         const lastSeenRef = ref(db, `users/${uid}/lastSeen`);
         set(lastSeenRef, Date.now());
      }
   }

   static setTyping(uid: string, typing: boolean) {
      const typingRef = ref(db, `users/${uid}/typing`);
      set(typingRef, typing);
   }
}
