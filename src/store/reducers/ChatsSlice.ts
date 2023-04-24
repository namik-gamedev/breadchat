import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChat } from 'src/types/types';

export interface ChatDataType {
   [id: string]: IChat;
}

interface StateType {
   data?: ChatDataType | null;
}

const initialState: StateType = {
   data: null,
};

const chatsSlice = createSlice({
   name: 'chats',
   initialState,
   reducers: {
      setChats: (state, { payload }: PayloadAction<DataType>) => {
         state.data = payload;
         // TODO: SORT (BY LAST MESSAGE TIME) CHATS HERE
      },
      removeChats: (state) => {
         state.data = null;
      },
   },
});

export const chatsReducer = chatsSlice.reducer;
export const { setChats, removeChats } = chatsSlice.actions;
