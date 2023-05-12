import { grey } from '@mui/material/colors';
import { ThemeOptions, createTheme } from '@mui/material/styles';

const baseThemeOptions: ThemeOptions = {
   components: {
      MuiCssBaseline: {
         'styleOverrides': {
            '*::-webkit-scrollbar': {
               width: '0.5em',
            },
            '*::-webkit-scrollbar-thumb': {
               backgroundColor: 'rgba(125, 125, 125, 1)',
               borderRadius: '50px',
            },
         },
      },
   },
};

export const lightThemeOptions: ThemeOptions = {
   ...baseThemeOptions,
   palette: {
      mode: 'light',
      primary: {
         main: '#9c6141',
         contrastText: '#eae0e0',
      },
      secondary: {
         main: '#417c9c',
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
   ...baseThemeOptions,
   palette: {
      mode: 'dark',
      primary: {
         main: '#83543b',
         contrastText: '#eae0e0',
      },
      secondary: {
         main: '#3f7ab3',
      },
      text: {
         primary: 'rgba(255,255,255,0.87)',
         secondary: 'rgba(255,255,255,0.57)',
      },
      background: { default: '#1d1b1a', paper: '#292625' },
      error: {
         main: '#b94444',
      },
      action: {
         active: 'rgba(255,255,255,0.7)',
      },
   },
};

export const lightTheme = createTheme(lightThemeOptions);
export const darkTheme = createTheme(darkThemeOptions);
