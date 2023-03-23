import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Main from '../../components/Main';
import AuthService from '../../services/AuthService';

const ForgotPassword = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');

  return (
    <Main title="">
      <Typography>{t('text.Your_Email')}</Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Button onClick={() => AuthService.forgotPassword(email)}>
        {t('text.Send')}
      </Button>
    </Main>
  );
};

export default ForgotPassword;
