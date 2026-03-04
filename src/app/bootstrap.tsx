import '@app/i18n';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { logger } from '@shared/logger';
import { createOvermind } from 'overmind';
import { Provider } from 'overmind-react';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.component';
import { getConfig } from './state';

logger.verbose('Bootstraping modules');

logger.verbose('Setting up overmind');
const overmind = createOvermind(getConfig(), {
  devtools: 'localhost:3031',
});

const defaultTheme = createTheme();

const theme = createTheme({
  palette: {
    primary: {
      main: '#388e3c',
    },
    secondary: {
      light: '#5FC0CB',
      main: '#5AB1BB',
      dark: '#33848D',
      contrastText: 'rgba(255, 255, 255, 0.95)',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiTabs: {
      defaultProps: {
        centered: true,
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 65,
          minWidth: 120,
        },
      },
      defaultProps: {
        iconPosition: 'start',
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          margin: 1,
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          border: `1px solid ${defaultTheme.palette.divider}`,
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
