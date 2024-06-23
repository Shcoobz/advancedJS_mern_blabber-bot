import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';
import { Toaster } from 'react-hot-toast';

import { STRING, THEME } from '../src/constants/constants.tsx';
import App from './App.tsx';

import './css/index.css';

/**
 * Set axios default base URL and enable credentials
 */
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

/**
 * Main entry point for the React application.
 * Renders the root component into the DOM.
 */
ReactDOM.createRoot(document.getElementById(STRING.ROOT)!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={THEME}>
          <Toaster />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
