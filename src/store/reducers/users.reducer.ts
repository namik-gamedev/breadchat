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
         state.data = payload.sort((a, b) => {
            if (a.online || b.online) {
               return -1;
            } else {
               return b.lastSeen - a.lastSeen;
            }
         });
      },
      unsetUsers: (state) => {
         state.data = [];
      },
   },
});

export const usersReducer = usersSlice.reducer;
export const { setUsers, unsetUsers } = usersSlice.actions;
