/**
 * A file for defining the global MUI theme used in the project.
 */
import { createTheme } from '@mui/material/styles';
import 'typeface-hk-grotesk';

// https://github.com/hack4impact/chapter-website-template/blob/main/public/style.css
export const theme = createTheme({
  palette: {
    primary: {
      light: '#F2F7FA',
      main: '#328ed8',
      dark: '#0F1C27'
    },
    secondary: {
      main: '#FDB833',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: [
      'GT Walsheim Pro',
      'HK Grotesk',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'sans-serif',
    ].join(','),
  },
});
