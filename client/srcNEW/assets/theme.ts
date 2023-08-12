/**
 * A file for defining the global MUI theme used in the project.
 */
import { createTheme } from '@mui/material/styles';
import COLORS from './colors';
import 'typeface-hk-grotesk';

// https://github.com/hack4impact/chapter-website-template/blob/main/public/style.css
export const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.primaryBlue,
    },
    secondary: {
      main: COLORS.secondarySeafoam,
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: [
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
