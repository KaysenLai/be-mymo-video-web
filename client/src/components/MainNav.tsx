import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import GhostButton from './GhostButton';
import logo from '../assets/img/MYMO_logo.svg';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  mainNav: {
    backgroundColor: theme.palette.background.default,
  },
  button: {
    marginRight: theme.spacing(2),
  },
  logo: {
    width: '90px',
  },
  logoWrap: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export default function Album() {
  const classes = useStyles();

  return (
    <AppBar position="relative" className={classes.mainNav}>
      <Toolbar>
        <Container>
          <Grid container alignItems="center" justify="space-between">
            <Grid item className={classes.logoWrap}>
              <Link to="/">
                <img className={classes.logo} src={logo} alt="mymo logo" />
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signin">
                <GhostButton className={classes.button} size="small">
                  Sign In
                </GhostButton>
              </Link>
              <Link to="/signup">
                <GhostButton size="small">Sign Up</GhostButton>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
