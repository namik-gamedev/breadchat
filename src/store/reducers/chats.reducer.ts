import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChat } from 'src/types/types';

interface StateType {
   data: IChat[];
}

const initialState: StateType = {
   data: [],
};

const chatsSlice = createSlice({
   name: 'chats',
   initialState,
   reducers: {
      setChats: (state, { payload }: PayloadAction<IChat[]>) => {
         state.data = payload;
         // TODO: SORT (BY LAST MESSAGE TIME) CHATS HERE
      },
      unsetChats: (state) => {
         state.data = [];
      },
   },
});

export const chatsReducer = chatsSlice.reducer;
export const { setChats, unsetChats } = chatsSlice.actions;
