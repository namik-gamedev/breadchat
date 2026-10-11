import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { STORAGE_KEYS } from 'src/constants/StorageKeys.consts';
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

const getInitialDarkTheme = (): boolean => {
   if (typeof window === 'undefined') return false;

   const storedTheme = localStorage.getItem(STORAGE_KEYS.theme);

   if (storedTheme !== null) {
      return storedTheme === 'true';
   }

   return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const getInitialLanguage = (): ILanguage => {
   if (typeof window === 'undefined') return ILanguage.EN;

   const storedLanguage = localStorage.getItem(STORAGE_KEYS.language);

   if (storedLanguage === ILanguage.EN || storedLanguage === ILanguage.RU) {
      return storedLanguage as ILanguage;
   }

   return navigator.language === 'ru-RU' ? ILanguage.RU : ILanguage.EN;
};

const initialState: StateType = {
   darkTheme: getInitialDarkTheme(),
   language: getInitialLanguage(),
   dataLoad: dataLoadInitialState,
};

const GlobalSlice = createSlice({
   name: 'global',
   initialState,
   reducers: {
      setDarkTheme: (state, { payload }: PayloadAction<boolean>) => {
         state.darkTheme = payload;
         localStorage.setItem(STORAGE_KEYS.theme, String(payload));
      },
      setLanguage: (state, { payload }: PayloadAction<ILanguage>) => {
         state.language = payload;
         localStorage.setItem(STORAGE_KEYS.language, payload);
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
