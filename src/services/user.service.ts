import { ref, remove, set, update } from 'firebase/database';
import { deleteObject, getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import { storage } from 'src/firebase/firebase';
import { db } from 'src/firebase/firebase';
import { IUser } from 'src/types/types';

export default class UserService {
   static async setup(user: IUser) {
      const userRef = ref(db, `users/${user.uid}`);

      await set(userRef, user);
   }

   static setAbout(uid: string, about: string) {
      const aboutRef = ref(db, `users/${uid}/about`);

      set(aboutRef, about);
   }

   static async setPhotoURL(uid: string, file: File) {
      const fileRef = storageRef(storage, `avatars/${uid}`);
      const uploadTask = await uploadBytes(fileRef, file);

      const url = await getDownloadURL(uploadTask.ref);

      const photoURLRef = ref(db, `users/${uid}/photoURL`);
      set(photoURLRef, url);
   }

   static unsetPhotoURL(uid: string) {
      const fileRef = storageRef(storage, `avatars/${uid}`);
      deleteObject(fileRef);

      const photoURLRef = ref(db, `users/${uid}/photoURL`);
      remove(photoURLRef);
   }

   static setOnline(uid: string, online: boolean) {
      const onlineRef = ref(db, `users/${uid}/online`);
      set(onlineRef, online);
      if (!online) {
         const lastSeenRef = ref(db, `users/${uid}/lastSeen`);
         set(lastSeenRef, Date.now());
      }
   }

   static setUserBlocked(uid: string, targetUser: IUser, blocked: boolean) {
      const blockedUserRef = ref(db, `users/${uid}/blockedUsers/${targetUser.uid}`);
      if (blocked) {
         set(blockedUserRef, targetUser.uid);
      } else {
         remove(blockedUserRef);
      }
   }
}
