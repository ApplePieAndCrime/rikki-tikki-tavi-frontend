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
import React, { useContext } from 'react';
import { LockOutlined } from '@mui/icons-material';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

import axios from 'axios';
import { apiUrl, googleClientId } from '../../utils/constants/base';
import Main from '../../components/Main';
import { t } from 'i18next';
import { Context } from '../..';
import { RegisterProps } from '../../utils/constants/props';
import AuthService from '../../services/AuthService';
import { redirect, useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';

const Registration = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
    const data = Object.fromEntries(formData.entries());

    await store
      .registration(data as unknown as RegisterProps)
      .then(() => navigate('/'));
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
                <LockOutlined />
              </Avatar>
              <Typography component="h1" variant="h5">
                {t('page_titles.Registration')}
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
              type="email"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="username"
              label="Username"
              type="text"
              id="username"
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
            >
              {t('SignUp')}
            </Button>
            <Grid display="flex" justifyContent="center">
              <Grid>
                <Link href="login" variant="body2">
                  {t('page_titles.Login')}
                </Link>
              </Grid>
            </Grid>
            <Grid paddingTop={3}></Grid>
          </Box>
        </Box>
      </Container>
    </Main>
  );
};

export default observer(Registration);
