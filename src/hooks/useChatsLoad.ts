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
         const messagesSnapshot = chatSnapshot.child('messages');

         let newMessages: IMessage[] = [];
         messagesSnapshot.forEach((messageSnapshot) => {
            const message: IMessage = messageSnapshot.val();

            let newImages: string[] = [];

            const imagesSnapshot = messageSnapshot.child('images');
            imagesSnapshot.forEach((imageSnapshot) => {
               const image: string = imageSnapshot.val();
               newImages = [...newImages, image];
            });

            // questions for masiya: if i use a push method, it's gonna be an error object is not extensible. why?
            newMessages = [...newMessages, { ...message, images: newImages }];
         });
         if (newMessages.length > 0) {
            const chat: IChat = {
               messages: newMessages,
               interlocutorUid: chatSnapshot.val().interlocutorUid,
               unreadedMessagesCount: chatSnapshot.val().unreadedMessagesCount,
               selfUnreadedMessagesCount: chatSnapshot.val().selfUnreadedMessagesCount,
               interlocutorTyping: chatSnapshot.val().interlocutorTyping,
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
