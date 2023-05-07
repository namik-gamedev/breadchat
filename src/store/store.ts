import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/user.reducer';
import { usersReducer } from './reducers/users.reducer';
import { globalReducer } from './reducers/global.reducer';
import { chatsReducer } from './reducers/chats.reducer';

export const store = configureStore({
   reducer: {
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
