import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IDataLoad {
   users: boolean;
   chats: boolean;
}

interface StateType {
   darkTheme: boolean;
   dataLoad: IDataLoad;
}

const dataLoadInitialState = {
   users: false,
   chats: false,
};

const initialState: StateType = {
   darkTheme: false,
   dataLoad: dataLoadInitialState,
};

const GlobalSlice = createSlice({
   name: 'global',
   initialState,
   reducers: {
      setDarkTheme: (state, { payload }: PayloadAction<boolean>) => {
         state.darkTheme = payload;
      },
      setUsersLoad: (state, { payload }: PayloadAction<boolean>) => {
         state.dataLoad.users = payload;
      },
      setChatsLoad: (state, { payload }: PayloadAction<boolean>) => {
         state.dataLoad.chats = payload;
      },
      unsetDataLoad: (state) => {
         state.dataLoad = dataLoadInitialState;
      },
   },
});

export const globalReducer = GlobalSlice.reducer;
export const { setDarkTheme, setUsersLoad, setChatsLoad, unsetDataLoad } = GlobalSlice.actions;
