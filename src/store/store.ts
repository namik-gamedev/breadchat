import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/UserSlice';
import { usersReducer } from './reducers/UsersSlice';
import { globalReducer } from './reducers/GlobalSlice';
import { chatReducer } from './reducers/ChatSlice';
import { chatsReducer } from './reducers/ChatsSlice';

export const store = configureStore({
   reducer: {
      chat: chatReducer,
      chats: chatsReducer,
      user: userReducer,
      users: usersReducer,
      global: globalReducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
