import '@app/i18n';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { logger } from '@shared/logger';
import { createOvermind } from 'overmind';
import { Provider } from 'overmind-react';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { verbose } from 'sqlite3';
import { App } from './App.component';
import { getConfig } from './state';

logger.verbose('Bootstraping modules');
verbose();

logger.verbose('Setting up overmind');
const overmind = createOvermind(getConfig(), {
  devtools: 'localhost:3031',
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#388e3c',
    },
    secondary: {
      // main: "#33691e"
      main: '#9c27b0',
    },
  },
  components: {
    MuiTabs: {
      styleOverrides: {
        root: {
          marginBottom: 2,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          margin: 1,
        },
      },
    },
  },
});

logger.verbose('Starting app UI');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider value={overmind}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <App />
          </LocalizationProvider>
        </CssBaseline>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
