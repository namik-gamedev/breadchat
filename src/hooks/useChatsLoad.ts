import { DataSnapshot, child, onValue, ref } from 'firebase/database';
import { useEffect } from 'react';
import { useAppSelector } from './useAppSelector';
import { db } from 'src/firebase/firebase';
import { useAppDispatch } from './useAppDispatch';
import { IChat, IMessage } from 'src/types/types';
import { setChats } from 'src/store/reducers/chats.reducer';
import { setChatsLoad } from 'src/store/reducers/global.reducer';

export const useChatsLoad = () => {
   const user = useAppSelector((state) => state.user.data);
   const dispatch = useAppDispatch();

   const callback = (chatsSnapshot: DataSnapshot) => {
      const newChats: IChat[] = [];
      chatsSnapshot.forEach((chatSnapshot) => {
         const chatRef = chatSnapshot.ref;
         const messagesRef = child(chatRef, 'messages');

         let newMessages: IMessage[] = [];
         onValue(messagesRef, (messagesSnapshot) => {
            messagesSnapshot.forEach((messageSnapshot) => {
               const message: IMessage = messageSnapshot.val();

               // questions for masiya: if i use a push method, it's gonna be an error object is not extensible. why?
               newMessages = [...newMessages, message];
            });
         });
         if (newMessages.length > 0) {
            const chat: IChat = {
               messages: newMessages,
               interlocutor: chatSnapshot.val().interlocutor,
               unreadedMessagesCount: chatSnapshot.val().unreadedMessagesCount,
               selfUnreadedMessagesCount: chatSnapshot.val().selfUnreadedMessagesCount,
            };

            newChats.push(chat);
         }
      });

      dispatch(setChats(newChats));
      dispatch(setChatsLoad(true));
   };

   useEffect(() => {
      if (user) {
         const chatsRef = ref(db, `chats/${user.uid}`);
         onValue(chatsRef, callback);
      }
   }, [user]);
};
