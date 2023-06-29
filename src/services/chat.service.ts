import { child, increment, ref, remove, serverTimestamp, set, update } from 'firebase/database';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import { db, storage } from 'src/firebase/firebase';
import { IUser } from 'src/types/types';

export default class ChatService {
   static create(userUid: string, interlocutorUid: string) {
      const chatRef = ref(db, `chats/${userUid}/${interlocutorUid}`);
      update(chatRef, { interlocutorUid });

      const interlocutorChatRef = ref(db, `chats/${interlocutorUid}/${userUid}`);
      update(interlocutorChatRef, { interlocutorUid: userUid });
   }

   static clear(uid: string, interlocutorUid: string, alsoForInterlocutor: boolean = false) {
      const messagesRef = ref(db, `chats/${uid}/${interlocutorUid}/messages`);
      remove(messagesRef);

      if (alsoForInterlocutor) {
         this.clear(interlocutorUid, uid);
      }
   }

   static message(uid: string, interlocutorUid: string, text: string, images?: FileList) {
      const createdAt = Date.now();

      const messagesRef = ref(db, `chats/${uid}/${interlocutorUid}/messages/${createdAt}`);
      set(messagesRef, { sender: 0, text, createdAt, edited: false });
      const interlocutorMessagesRef = ref(db, `chats/${interlocutorUid}/${uid}/messages/${createdAt}`);
      set(interlocutorMessagesRef, { sender: 1, text, createdAt, edited: false });

      this.increaseUnreadedMessagesCount(uid, interlocutorUid);

      if (!images) {
         return;
      }
      Array.from(images).forEach((image, index) => {
         console.log(image);

         // path is "chatImages/{senderUid}/{createdAt}"
         const fileRef = storageRef(storage, `chatImages/${uid}/${createdAt}/${index}`);
         uploadBytes(fileRef, image).then((uploadTask) => {
            getDownloadURL(uploadTask.ref).then((url) => {
               console.log(url);

               const imageRef = ref(db, `chats/${uid}/${interlocutorUid}/messages/${createdAt}/images/${index}`);
               set(imageRef, url);
               const interlocutorImageRef = ref(db, `chats/${interlocutorUid}/${uid}/messages/${createdAt}/images/${index}`);
               set(interlocutorImageRef, url);
            });
         });
      });
   }

   static deleteMessage(uid: string, interlocutorUid: string, createdAt: number, alsoForInterlocutor: boolean = false, isUnreaded: boolean = false) {
      const messageRef = ref(db, `chats/${uid}/${interlocutorUid}/messages/${createdAt}`);
      remove(messageRef);

      if (alsoForInterlocutor) {
         this.deleteMessage(interlocutorUid, uid, createdAt);
         if (isUnreaded) {
            this.decreaseUnreadedMessagesCount(uid, interlocutorUid);
         }
      }
   }

   static editMessage(uid: string, interlocutorUid: string, createdAt: number, newText: string) {
      const messageRef = ref(db, `chats/${uid}/${interlocutorUid}/messages/${createdAt}`);
      update(messageRef, { text: newText, edited: true });

      const interocutorMessageRef = ref(db, `chats/${interlocutorUid}/${uid}/messages/${createdAt}`);
      update(interocutorMessageRef, { text: newText, edited: true });
   }

   static increaseUnreadedMessagesCount(uid: string, interlocutorUid: string) {
      const selfUnreadedMessagesCountRef = ref(db, `chats/${uid}/${interlocutorUid}/selfUnreadedMessagesCount`);
      set(selfUnreadedMessagesCountRef, increment(1));
      const unreadedMessagesCountRef = ref(db, `chats/${interlocutorUid}/${uid}/unreadedMessagesCount`);
      set(unreadedMessagesCountRef, increment(1));
   }

   static decreaseUnreadedMessagesCount(uid: string, interlocutorUid: string) {
      const selfUnreadedMessagesCountRef = ref(db, `chats/${uid}/${interlocutorUid}/selfUnreadedMessagesCount`);
      set(selfUnreadedMessagesCountRef, increment(-1));
      const unreadedMessagesCountRef = ref(db, `chats/${interlocutorUid}/${uid}/unreadedMessagesCount`);
      set(unreadedMessagesCountRef, increment(-1));
   }

   static unsetUnreadedMessagesCount(uid: string, interlocutorUid: string) {
      // interlocutor's field selfUnreadedMessagesCount
      const selfUnreadedMessagesCountRef = ref(db, `chats/${interlocutorUid}/${uid}/selfUnreadedMessagesCount`);
      set(selfUnreadedMessagesCountRef, 0);
      const unreadedMessagesCountRef = ref(db, `chats/${uid}/${interlocutorUid}/unreadedMessagesCount`);
      set(unreadedMessagesCountRef, 0);
   }

   static setTyping(uid: string, interlocutorUid: string, typing: boolean) {
      const typingRef = ref(db, `chats/${interlocutorUid}/${uid}/interlocutorTyping`);
      set(typingRef, typing);
   }
}
