import { verbose } from 'sqlite3';
import 'app/i18n';
import { App } from './App.component';
import './storage';
import { initializeModules } from './initializeModules';
import { getConfig } from './state';
import { createOvermind } from 'overmind';
import { Provider } from 'overmind-react';
import { logger } from './logger';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import React from 'react';

logger.verbose('Bootstraping modules');
verbose();
initializeModules();

logger.verbose('Setting up overmind');
const overmind = createOvermind(getConfig());

const theme = createTheme({
  palette: {
    primary: {
      main: '#388e3c'
    },
    secondary: {
      // main: "#33691e"
      main: '#9c27b0'
    }
  },
  components: {
    MuiTabs: {
      styleOverrides: {
        root: {
          marginBottom: 2
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          margin: 1
        }
      }
    }
  }
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
  </StrictMode>
);
