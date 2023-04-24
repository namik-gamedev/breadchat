import { useEffect, useState } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { setUser } from 'src/store/reducers/UserSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { appAuth, db } from 'src/firebase/firebase';
import { child, onValue, ref } from 'firebase/database';
import { IChat, IMessage, IUser } from 'src/types/types';
import { setUsers } from 'src/store/reducers/UsersSlice';
import { ChatDataType, setChats } from 'src/store/reducers/ChatsSlice';

interface DataLoad {
   user: boolean;
   users: boolean;
   chats: boolean;
}

export const useDBLoad = () => {
   const [dataLoad, setDataLoad] = useState<DataLoad>({ user: false, users: false, chats: false });
   const dispatch = useAppDispatch();

   const allDataLoaded = () => {
      return Object.values(dataLoad).every((loaded) => loaded);
   };

   useEffect(() => {
      const unsubAuthState = onAuthStateChanged(appAuth, (user) => {
         setDataLoad((prev) => ({ ...prev, user: true }));
         if (user) {
            // TODO: ADD HERE PHOTOURL
            dispatch(
               setUser({
                  displayName: user.displayName!,
                  uid: user.uid,
               })
            );

            const usersRef = ref(db, 'users');
            onValue(usersRef, (usersSnapshot) => {
               const newUsers: IUser[] = [];
               usersSnapshot.forEach((userSnapshot) => {
                  newUsers.push(userSnapshot.val());
               });
               dispatch(setUsers(newUsers));
               setDataLoad((prev) => ({ ...prev, users: true }));
            });

            const chatsRef = ref(db, 'chats/' + user.uid);
            onValue(chatsRef, (chatsSnapshot) => {
               const newChats: ChatDataType = {};

               chatsSnapshot.forEach((chatSnapshot) => {
                  const chatRef = chatSnapshot.ref;
                  const messagesRef = child(chatRef, 'messages');

                  const newMessages: IMessage[] = [];

                  onValue(messagesRef, (messagesSnapshot) => {
                     messagesSnapshot.forEach((messageSnapshot) => {
                        newMessages.push(messageSnapshot.val());
                     });
                  });
                  newChats[chatRef.key!] = { messages: newMessages };
               });
               dispatch(setChats(newChats));
               setDataLoad((prev) => ({ ...prev, chats: true }));
            });
         } else {
            setDataLoad((prev) => ({ ...prev, user: true }));
            setDataLoad((prev) => ({ ...prev, users: true }));
            setDataLoad((prev) => ({ ...prev, chats: true }));
         }
      });

      return () => {
         unsubAuthState();
      };
   }, []);

   return allDataLoaded;
};
