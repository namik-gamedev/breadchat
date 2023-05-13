import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'src/types/types';

interface StateType {
   data: IUser[];
}

const initialState: StateType = {
   data: [],
};

const usersSlice = createSlice({
   name: 'users',
   initialState,
   reducers: {
      setUsers: (state, { payload }: PayloadAction<IUser[]>) => {
         state.data = payload;
      },
      unsetUsers: (state) => {
         state.data = [];
      },
   },
   // TODO: SORT USERS METHODS HERE
   //
   //
});

export const usersReducer = usersSlice.reducer;
export const { setUsers, unsetUsers } = usersSlice.actions;
