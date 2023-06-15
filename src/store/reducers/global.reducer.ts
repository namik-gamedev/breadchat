import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDataLoad, ILanguage } from 'src/types/types';

interface StateType {
   darkTheme: boolean;
   language: ILanguage;
   dataLoad: IDataLoad;
}

const dataLoadInitialState = {
   user: false,
   users: false,
   chats: false,
};

const initialState: StateType = {
   darkTheme: false,
   language: navigator.language === 'ru-RU' ? ILanguage.RU : ILanguage.EN,
   dataLoad: dataLoadInitialState,
};

const GlobalSlice = createSlice({
   name: 'global',
   initialState,
   reducers: {
      setDarkTheme: (state, { payload }: PayloadAction<boolean>) => {
         state.darkTheme = payload;
      },
      setLanguage: (state, { payload }: PayloadAction<ILanguage>) => {
         state.language = payload;
      },
      setUserLoad: (state, { payload }: PayloadAction<boolean>) => {
         state.dataLoad.user = payload;
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
export const { setDarkTheme, setUsersLoad, setUserLoad, setChatsLoad, unsetDataLoad, setLanguage } = GlobalSlice.actions;
