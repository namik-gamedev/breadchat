import { child, increment, ref, remove, set } from 'firebase/database';
import { db } from 'src/firebase/firebase';
import { IUser } from 'src/types/types';

export default class ChatService {
   static create(user: IUser, interlocutor: IUser) {
      const chatRef = ref(db, `chats/${user.uid}/${interlocutor.uid}`);
      set(chatRef, { interlocutor });

      const interlocutorChatRef = ref(db, `chats/${interlocutor.uid}/${user.uid}`);
      set(interlocutorChatRef, { interlocutor: user });
   }

   static delete(uid: string, interlocutorUid: string, alsoForInterlocutor?: boolean) {
      const chatRef = ref(db, `chats/${uid}/${interlocutorUid}`);
      remove(chatRef);

      if (alsoForInterlocutor) {
         this.delete(interlocutorUid, uid);
      }
   }

   static message(uid: string, interlocutorUid: string, text: string) {
      const createdAt = Date.now();

      const chatRef = ref(db, `chats/${uid}/${interlocutorUid}`);
      set(child(chatRef, `messages/${createdAt}`), { sender: 0, text, createdAt });

      this.increaseUnreadedMessagesCount(uid, interlocutorUid);

      const interlocutorChatRef = ref(db, `chats/${interlocutorUid}/${uid}`);
      set(child(interlocutorChatRef, `messages/${createdAt}`), { sender: 1, text, createdAt });
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

   static increaseUnreadedMessagesCount(uid: string, interlocutorUid: string) {
      const selfUnreadedMessagesCountRef = ref(db, `chats/${uid}/${interlocutorUid}/selfUnreadedMessagesCount`);
      set(selfUnreadedMessagesCountRef, increment(1));
      const interlocutorUnreadedMessagesCountRef = ref(db, `chats/${interlocutorUid}/${uid}/unreadedMessagesCount`);
      set(interlocutorUnreadedMessagesCountRef, increment(1));
   }

   static decreaseUnreadedMessagesCount(uid: string, interlocutorUid: string) {
      const selfUnreadedMessagesCountRef = ref(db, `chats/${uid}/${interlocutorUid}/selfUnreadedMessagesCount`);
      set(selfUnreadedMessagesCountRef, increment(-1));
      const interlocutorUnreadedMessagesCountRef = ref(db, `chats/${interlocutorUid}/${uid}/unreadedMessagesCount`);
      set(interlocutorUnreadedMessagesCountRef, increment(-1));
   }

   static unsetUnreadedMessagesCount(uid: string, interlocutorUid: string) {
      const unreadedMessagesCountRef = ref(db, `chats/${uid}/${interlocutorUid}/unreadedMessagesCount`);
      set(unreadedMessagesCountRef, 0);
   }
}
