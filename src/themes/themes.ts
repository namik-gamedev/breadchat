import { grey } from '@mui/material/colors';
import { ThemeOptions, createTheme } from '@mui/material/styles';

export const lightThemeOptions: ThemeOptions = {
   palette: {
      mode: 'light',
      primary: {
         main: '#bf7e16',
         contrastText: '#eae0e0',
      },
      secondary: {
         main: '#1657bf',
      },

      text: {
         primary: 'rgba(0,0,0,0.87)',
      },
      background: {
         paper: grey[300],
      },
      error: {
         main: '#e04949',
      },
   },
};

export const darkThemeOptions: ThemeOptions = {
   palette: {
      mode: 'dark',
      primary: {
         main: '#b3783f',
         contrastText: '#eae0e0',
      },
      secondary: {
         main: '#3f7ab3',
      },
      text: {
         primary: 'rgba(255,255,255,0.87)',
      },
      background: { default: '#1d1b1a', paper: '#292625' },
      error: {
         main: '#b94444',
      },
   },
};

export const lightTheme = createTheme(lightThemeOptions);
export const darkTheme = createTheme(darkThemeOptions);
