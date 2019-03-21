import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: ['Arial'],
  },
  palette: {
    type: 'light',
    primary: {
      main: '#BDD3DE',
    },
    secondary: {
      main: '#2B3A42',
    },
  },
});

export default theme;
