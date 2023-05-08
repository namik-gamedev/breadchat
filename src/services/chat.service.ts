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

   static clear(uid: string, interlocutorUid: string, alsoForInterlocutor?: boolean) {
      const messagesRef = ref(db, `chats/${uid}/${interlocutorUid}/messages`);
      remove(messagesRef);

      if (alsoForInterlocutor) {
         this.clear(interlocutorUid, uid);
      }
   }

   static message(uid: string, interlocutorUid: string, text: string) {
      const createdAt = Date.now();

      const chatRef = ref(db, `chats/${uid}/${interlocutorUid}`);
      set(child(chatRef, `messages/${createdAt}`), { sender: 0, text, createdAt });

      const interlocutorChatRef = ref(db, `chats/${interlocutorUid}/${uid}`);
      set(child(interlocutorChatRef, `messages/${createdAt}`), { sender: 1, text, createdAt });
   }

   static deleteMessage(uid: string, interlocutorUid: string, createdAt: number, alsoForInterlocutor: boolean = false) {
      const messageRef = ref(db, `chats/${uid}/${interlocutorUid}/messages/${createdAt}`);
      remove(messageRef);

      if (alsoForInterlocutor) {
         this.deleteMessage(interlocutorUid, uid, createdAt);
      }
   }

   static increaseUnreadedMessagesCount(uid: string, interlocutorUid: string) {
      const interlocutorUnreadedMessagesRef = ref(db, `chats/${interlocutorUid}/${uid}/unreadedMessagesCount`);
      set(interlocutorUnreadedMessagesRef, increment(1));
   }

   static unsetUnreadedMessagesCount(uid: string, interlocutorUid: string) {
      const unreadedMessagesRef = ref(db, `chats/${uid}/${interlocutorUid}/unreadedMessagesCount`);
      set(unreadedMessagesRef, 0);
   }
}
