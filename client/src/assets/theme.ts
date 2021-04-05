import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#ff5c8d',
      main: '#E73273',
      dark: '#d2225d',
      contrastText: '#fff',
    },
    secondary: {
      light: '#c158dc',
      main: '#8e24aa',
      dark: '#5c007a',
      contrastText: '#fff',
    },
    background: {
      default: '#181818',
      paper: '#222222',
    },
  },
});

export default theme;
