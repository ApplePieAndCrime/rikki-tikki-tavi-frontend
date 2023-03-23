import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { KeyOutlined } from '@mui/icons-material';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

import axios from 'axios';
import { apiUrl, googleClientId } from '../../utils/constants/base';
import { useTranslation } from 'react-i18next';
import Main from '../../components/Main';
import BaseAlert from '../../components/alert/BaseAlert';

import { redirect, useNavigate } from 'react-router';
import { Context } from '../..';
import AuthService from '../../services/AuthService';
import { observer } from 'mobx-react-lite';

const Login = () => {
  const { t } = useTranslation();
  const [showAlert, setShowAlert] = useState(false);
  const [errorText, setErrorText] = useState('');

  const { store } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // const email = data.get('email') || '';
    // const password = data.get('password') || '';

    // const { email, password } = data.getAll();

    // const { email, password } = event.target;
    // @ts-ignore
    const email = event.target.email.value;
    // @ts-ignore
    const password = event.target.password.value;

    console.log({
      email,
      password,
    });
    if (!email || !password) {
      setShowAlert(true);
      setErrorText(t(`error.FillFields`) || '');
      return;
    }

    const tokens = await store
      .login(email, password)
      .then(() => {
        console.log('login func');
        navigate('/');
      })
      .catch(err => {
        console.log('req error', err);
        setShowAlert(true);
        // @ts-ignore
        setErrorText(t(`error.${err.errorMessage}`, t('error.Unknown error')));
      });
  };

  return (
    <Main title="">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box width="100%" display="flex">
            <Box
              width="60%"
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <KeyOutlined />
              </Avatar>
              <Typography component="h1" variant="h5">
                {t('page_titles.Login')}
              </Typography>
            </Box>
            <Box
              width="40%"
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
            >
              <GoogleOAuthProvider clientId={`${googleClientId}`}>
                <GoogleLogin
                  type="icon"
                  onSuccess={async credentialResponse => {
                    const data = await AuthService.loginGoogle(
                      credentialResponse
                    );

                    console.log({ data });

                    // localStorage.setItem("AuthData", JSON.stringify(data));
                    // setAuthData(data);
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />
              </GoogleOAuthProvider>
            </Box>
          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              // onClick={LoginUser}
            >
              {t('page_titles.Login')}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgot-password" variant="body2">
                  {t('text.Forgot_password')}
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {t('text.Dont_have_account')}
                </Link>
              </Grid>
            </Grid>
            <Grid paddingTop={3}></Grid>
          </Box>
        </Box>
      </Container>
      <BaseAlert
        open={showAlert}
        setOpen={setShowAlert}
        severity="error"
        text={errorText}
      />
    </Main>
  );
};

export default observer(Login);
