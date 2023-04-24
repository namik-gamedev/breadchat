import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'src/types/types';

interface StateType {
   data?: IUser | null;
}

const initialState: StateType = {
   data: null,
};

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setUser: (state, { payload }: PayloadAction<IUser>) => {
         state.data = payload;
      },
      unsetUser: (state) => {
         state.data = null;
      },
   },
});

export const userReducer = userSlice.reducer;
export const { setUser, unsetUser } = userSlice.actions;
