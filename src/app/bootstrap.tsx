import '@app/i18n';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { logger } from '@shared/logger';
import { createOvermind } from 'overmind';
import { Provider } from 'overmind-react';
import React, { PropsWithChildren, StrictMode } from 'react';
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

class ErrorBoundary extends React.Component<
  PropsWithChildren,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { hasError: boolean; error: any }
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logger.error(`Unexpected crash while rendering app: ${error}\nErrorInfo: ${errorInfo}`);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',

            width: '100vw',
            height: '100vh',
          }}
        >
          <h1>Unexpected error occured.</h1>

          {this.state.error && (
            <p>
              {typeof this.state.error === 'string'
                ? this.state.error
                : this.state.error.toString()}
            </p>
          )}
          {!this.state.error && <p>No error details available.</p>}

          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider value={overmind}>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <App />
            </LocalizationProvider>
          </CssBaseline>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
);
