import {
  AppBar,
  Box,
  Button,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';

import React, { useCallback, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ChooseLang from './ChooseLang';
import { Link, useLocation } from 'react-router-dom';
import { Context } from '..';
import AuthService from '../services/AuthService';
import { observer } from 'mobx-react-lite';

export interface HeaderProps {
  title: string;
}
const Header = (props: HeaderProps) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const changeLanguage = useCallback((lng: string) => {
    console.log('lang', lng);
    i18n.changeLanguage(lng);
  }, []);

  const { title } = props;
  console.log({ title });
  const { store } = useContext(Context);
  console.log({ store });

  // useEffect(() => {
  //   changeLanguage('en');
  // }, []);

  return (
    <Box>
      {/* <Box bgcolor="secondary">header = {t(title)}</Box> */}
      <Box sx={{ flexGrow: 1 }} className="header">
        <AppBar position="static">
          <Toolbar>
            <Typography
              // component={<Button href="/"></Button>}
              variant="h6"
              sx={{ flexGrow: 1 }}
            >
              {location.pathname === '/' ? (
                title
              ) : (
                <Link
                  to="/"
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    fontSize: 'inherit',
                  }}
                >
                  {title}
                </Link>
              )}
            </Typography>
            <Box display="flex" sx={{ flexGrow: 1 }} justifyContent="flex-end">
              {store.isAuth ? (
                <Button
                  color="inherit"
                  onClick={() => store.logout()}
                  sx={{ marginRight: 3 }}
                >
                  {t('page_titles.Logout')}
                </Button>
              ) : (
                <Button color="inherit" href="/login" sx={{ marginRight: 3 }}>
                  {t('page_titles.Login')}
                </Button>
              )}
              <ChooseLang onChange={changeLanguage} />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
};

export default observer(Header);
