import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';
import { Toaster } from 'react-hot-toast';

import { THEME } from '../src/constants/constants.tsx';
import App from './App.tsx';

import './index.css';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={THEME}>
          <Toaster />
          <App />
        </ThemeProvider>
      </BrowserRouter>{' '}
    </AuthProvider>
  </React.StrictMode>
);
