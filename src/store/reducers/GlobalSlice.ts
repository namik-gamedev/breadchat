import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StateType {
   darkTheme: boolean;
}

const initialState: StateType = {
   darkTheme: false,
};

const GlobalSlice = createSlice({
   name: 'global',
   initialState,
   reducers: {
      setDarkTheme: (state, { payload }: PayloadAction<boolean>) => {
         state.darkTheme = payload;
      },
   },
});

export const globalReducer = GlobalSlice.reducer;
export const { setDarkTheme } = GlobalSlice.actions;
