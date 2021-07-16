import { createTheme } from '@material-ui/core/styles';
import colors from './colors';

const theme = createTheme({
  spacing: 4,
  palette: {
    primary: {
      main: colors.darkPurple,
      contrastText: '#fff',
    },
    secondary: {
      main: colors.lightPurple,
      contrastText: '#fff',
    },
    error: {
      main: colors.default.error,
    },
    warning: {
      main: colors.default.warning,
    },
    info: {
      main: colors.default.info,
    },
    success: {
      main: colors.default.success,
    },
  },
  typography: {
    fontFamily: ['Kanit', 'sans-serif'].join(','),
  },
});

export default theme;
