import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { IChat } from 'src/types/types';

interface StateType {
   data?: IChat | null;
}

const initialState: StateType = {
   data: null,
};

const chatSlice = createSlice({
   name: 'chat',
   initialState,
   reducers: {
      setChat: (state, { payload }: PayloadAction<IChat>) => {
         state.data = payload;
      },
      unsetChat: (state) => {
         state.data = null;
      },
   },
});

export const chatReducer = chatSlice.reducer;
export const { setChat, unsetChat } = chatSlice.actions;
