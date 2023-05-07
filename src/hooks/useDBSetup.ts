import { useEffect, useState } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { setUser, unsetUser } from 'src/store/reducers/user.reducer';
import { onAuthStateChanged } from 'firebase/auth';
import { appAuth, db } from 'src/firebase/firebase';
import { DataSnapshot, child, get, goOffline, limitToFirst, onDisconnect, onValue, ref } from 'firebase/database';
import { IChat, IMessage, IUser, IUserWithDBFields } from 'src/types/types';
import { setUsers } from 'src/store/reducers/users.reducer';
import { setChats, unsetChats } from 'src/store/reducers/chats.reducer';
import { useAppSelector } from './useAppSelector';
import { setChatsLoad, setUsersLoad, unsetDataLoad } from 'src/store/reducers/global.reducer';
import UserService from 'src/services/user.service';

function getCurrentTime() {
   return Date.now();
}

export const useDBSetup = () => {
   const dispatch = useAppDispatch();
   const userState = useAppSelector((state) => state.user.data);

   const usersCallback = (usersSnapshot: DataSnapshot) => {
      const newUsers: IUserWithDBFields[] = [];
      usersSnapshot.forEach((userSnapshot) => {
         const user = userSnapshot.val();
         newUsers.push(user);
      });
      dispatch(setUsers(newUsers));
      dispatch(setUsersLoad(true));
   };

   const chatsCallback = (chatsSnapshot: DataSnapshot) => {
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
         const chat: IChat = { messages: newMessages, interlocutor: chatSnapshot.val().interlocutor };

         newChats.push(chat);
      });

      dispatch(setChats(newChats));
      dispatch(setChatsLoad(true));
   };

   useEffect(() => {
      const unsubAuthState = onAuthStateChanged(appAuth, (user) => {
         dispatch(unsetDataLoad());

         if (user) {
            // TODO: ADD HERE PHOTOURL
            const newUser: IUser = {
               displayName: user.displayName!,
               uid: user.uid,
               photoURL: user.photoURL,
            };

            UserService.setOnline(user.uid, true);

            dispatch(setUser(newUser));

            const usersRef = ref(db, 'users');
            onValue(usersRef, usersCallback);

            const chatsRef = ref(db, `chats/${user.uid}`);
            onValue(chatsRef, chatsCallback);
         } else {
            if (userState) {
               UserService.setOnline(userState.uid, false);
            }
            dispatch(unsetUser());
            dispatch(unsetChats());
            dispatch(setChatsLoad(true));
            dispatch(setUsersLoad(true));
         }
      });

      return unsubAuthState;
   }, []);
};
