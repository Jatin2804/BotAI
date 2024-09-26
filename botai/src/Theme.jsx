// src/theme.js
import { createTheme } from '@mui/material/styles';

export const Theme = (darkMode) => createTheme({
  palette: {
    mode: darkMode ? 'dark' : 'light',
    primary: {
      main: darkMode ?  '#242222' : '#AF9FCD',
      dark: darkMode ?  '#070707' : '#9785BA',
      light: darkMode ?  '#474747' : '#F9FAFA',
    },
    secondary: {
      main: darkMode ?  '#353434fc' : '#966681',
      dark: darkMode ?  '#2a2a2a' : '#D7C7F4',
    },
    background: {
      default: darkMode ? '#121212' : '#F9FAFA',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    
    h1: {
        fontSize: '2rem',
        color: darkMode ? '#FFFFFF' : '#121212', // Set custom color here
        '@media (min-width:600px)': {
          fontSize: '3rem',
        },
      },
      h2: {
        fontSize: '1.75rem',
        color: darkMode ? '#F5F5F5' : '#121212', // Set custom color here
        '@media (min-width:600px)': {
          fontSize: '2.5rem',
        },
      },
      body1: {
        color: darkMode ? '#E0E0E0' : '#121212', // Set body text color here
      },
  },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: '8px',
//           textTransform: 'none',
//         },
//       },
//     },
//   },
});
