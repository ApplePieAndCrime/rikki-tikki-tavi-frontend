import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from './utils/constants/base';

import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import Store from './store/store';

interface StoreProps {
  store: Store;
}

const store = new Store();

export const Context = createContext<StoreProps>({ store });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Context.Provider value={{ store }}>
        <App />
      </Context.Provider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
