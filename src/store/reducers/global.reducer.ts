import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IDataLoad {
   users: boolean;
   chats: boolean;
}

export enum Language {
   EN = 'en',
   RU = 'ru',
}

interface StateType {
   darkTheme: boolean;
   language: Language;
   dataLoad: IDataLoad;
}

const dataLoadInitialState = {
   users: false,
   chats: false,
};

const initialState: StateType = {
   darkTheme: false,
   language: Language.EN,
   dataLoad: dataLoadInitialState,
};

const GlobalSlice = createSlice({
   name: 'global',
   initialState,
   reducers: {
      setDarkTheme: (state, { payload }: PayloadAction<boolean>) => {
         state.darkTheme = payload;
      },
      setLanguage: (state, { payload }: PayloadAction<Language>) => {
         state.language = payload;
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
export const { setDarkTheme, setUsersLoad, setChatsLoad, unsetDataLoad, setLanguage } = GlobalSlice.actions;
