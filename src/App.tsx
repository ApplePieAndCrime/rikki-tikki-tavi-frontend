import React, { Suspense, useContext, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router';
import { Helmet } from 'react-helmet';

import { useTranslation } from 'react-i18next';

import Login from './pages/Login/Login';
import Registration from './pages/Login/Registration';
import DialogueList from './pages/Dialogue/DialogueList';
import Dialogue from './pages/Dialogue/Dialogue';
import CreateDialogue from './pages/Dialogue/CreateDialogue';
import EditDialogue from './pages/Dialogue/EditDialogue';
import DictationList from './pages/Dictation/DictationList';
import CreateDictation from './pages/Dictation/CreateDictation';
import Dictation from './pages/Dictation/Dictation';
import Home from './pages/Home/HomePage/Home';
import TranslationList from './pages/Translations/TranslationList';
import CreateTranslations from './pages/Translations/CreateTranslation';
import Translation from './pages/Translations/Translation';
import { Context } from '.';
import ForgotPassword from './pages/Login/ForgotPassword';

function App() {
  const { t, i18n, ready } = useTranslation();

  const routerList = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/home',
      element: <Home />,
    },

    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Registration />,
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />,
    },
    {
      path: '/dialogues',
      element: <DialogueList />,
    },
    {
      path: '/dialogues/create',
      element: <CreateDialogue />,
    },
    {
      path: '/dialogues/:id',
      element: <Dialogue />,
    },
    {
      path: '/dialogues/:id/edit',
      element: <EditDialogue />,
    },

    {
      path: '/dictations',
      element: <DictationList />,
    },
    {
      path: '/dictations/create',
      element: <CreateDictation />,
    },
    {
      path: '/dictations/:id',
      element: <Dictation />,
    },
    {
      path: '/dictations/:id/edit',
      // element: <EditDictation />,
    },

    {
      path: '/translations',
      element: <TranslationList />,
    },
    {
      path: '/translations/create',
      element: <CreateTranslations />,
    },
    {
      path: '/translations/:id',
      element: <Translation />,
    },
    {
      path: '/translations/:id/edit',
      // element: <EditDictation />,
    },
  ]);

  return (
    <Suspense fallback="loading">
      <div className="body-content">
        <Helmet>
          <meta http-equiv="cache-control" content="no-cache" />
          <meta http-equiv="expires" content="0" />
          <meta http-equiv="pragma" content="no-cache" />
          <title>{t('page_title.MainTitle')}</title>
        </Helmet>

        <RouterProvider router={routerList} />
      </div>
    </Suspense>
  );
}

export default App;
