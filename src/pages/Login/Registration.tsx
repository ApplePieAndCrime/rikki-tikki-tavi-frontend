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
import React from 'react';
import { LockOutlined } from '@mui/icons-material';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

import axios from 'axios';
import { apiUrl, googleClientId } from '../../utils/constants/base';
import Main from '../../components/Main';

const Registration = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
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
                <LockOutlined />
              </Avatar>
              <Typography component="h1" variant="h5">
                Register
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
                    console.log(credentialResponse);
                    const { data } = await axios.post(
                      `${apiUrl}/auth/login-google`,
                      {
                        // pass the token as part of the req body
                        token: credentialResponse.credential,
                      }
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
            >
              Sign In
            </Button>
            <Grid display="flex" justifyContent="center">
              <Grid>
                <Link href="login" variant="body2">
                  {'Sign In'}
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

export default Registration;
