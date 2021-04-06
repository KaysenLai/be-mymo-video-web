import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Box, Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import randomImg from '../assets/randomImg';
import { emailErrorText, validateEmail, passwordEmptyText } from '../utils/validation';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  box: {
    margin: theme.spacing(8, 0),
    [theme.breakpoints.up('xs')]: {
      margin: theme.spacing(8, 4),
    },
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(8, 4),
    },
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(8, 6),
    },
    [theme.breakpoints.up('lg')]: {
      margin: theme.spacing(8, 8),
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  button: {
    marginTop: '20px',
  },
}));

const SignInPage: React.FC = () => {
  const classes = useStyles();
  const [randomImgUrl, setRandomImgUrl] = useState('');
  if (randomImgUrl === '') setRandomImgUrl(randomImg());
  const [email, setEmail] = useState({ value: '', error: false, helperText: '' });
  const [password, setPassword] = useState({ value: '', error: false, helperText: '' });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (email.value === '') setEmail({ ...email, error: true, helperText: emailErrorText });
    if (password.value === '') setPassword({ ...password, error: true, helperText: passwordEmptyText });
    if (email.error || password.error) return;
    console.log(email, password);
  };

  const handleEmailOnchange = (e: any) => {
    const inputEmail = e.target.value;
    if (validateEmail(inputEmail)) setEmail({ value: inputEmail, error: false, helperText: '' });
    else setEmail({ value: inputEmail, error: true, helperText: emailErrorText });
  };

  const handlePasswordOnchange = (e: any) => {
    const inputPassword = e.target.value;
    if (inputPassword === '') {
      setPassword({ value: inputPassword, error: true, helperText: passwordEmptyText });
    }
    setPassword({ value: inputPassword, error: false, helperText: '' });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box className={classes.box}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate method="post" onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Email Address"
              name="email"
              autoFocus
              value={email.value}
              error={email.error}
              helperText={email.helperText}
              onChange={handleEmailOnchange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={password.value}
              error={password.error}
              helperText={password.helperText}
              onChange={handlePasswordOnchange}
            />
            <Button type="submit" fullWidth variant="contained" size="large" color="primary" className={classes.button}>
              Sign In
            </Button>
            <Button fullWidth variant="contained" size="large" color="primary" className={`${classes.button} btn-grey`}>
              Sign Up
            </Button>
          </form>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        lg={8}
        className={classes.image}
        style={{ backgroundImage: `url(${randomImgUrl})` }}
      />
    </Grid>
  );
};

export default SignInPage;
