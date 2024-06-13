import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';
import { Toaster } from 'react-hot-toast';

import App from './App.tsx';

import './index.css';

// TODO:
// * implement one name signup -> check if name is one word, or at least two
// *fix error loading chats after logout

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto Slab, sans-serif',
    allVariants: { color: 'whitesmoke' },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Toaster position='top-right' />
          <App />
        </ThemeProvider>
      </BrowserRouter>{' '}
    </AuthProvider>
  </React.StrictMode>
);
