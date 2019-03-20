import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: ['Arial'],
  },
  palette: {
    type: 'light',
    primary: {
      main: '#aeb7c4',
    },
    secondary: {
      main: '#d6aaf7',
    },
  },
});

export default theme;
