import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import './index.css';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto Slab, sans-serif',
    allVariants: { color: 'whitesmoke' },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
