import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ff5c8d',
      main: '#d81b60',
      dark: '#a00037',
      contrastText: '#fff',
    },
    secondary: {
      light: '#c158dc',
      main: '#8e24aa',
      dark: '#5c007a',
      contrastText: '#fff',
    },
  },
});

export default theme;
