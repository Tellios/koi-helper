import '@app/i18n';
import { createTheme, CssBaseline, darken, lighten, Palette, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { logger } from '@shared/logger';
import React, { PropsWithChildren, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.component';

declare module '@mui/material/styles' {
  interface Theme {
    palette: Palette & {
      lightBackground: string;
    };
  }

  interface PaletteOptions {
    lightBackground: string;
  }
}

logger.verbose('Bootstraping modules');
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#388e3c',
    },
    secondary: {
      light: lighten('#218be3', 0.5),
      main: '#218be3',
      dark: darken('#218be3', 0.5),
      contrastText: 'rgba(255, 255, 255, 0.95)',
    },
    lightBackground: `rgb(from #388e3c r g b / 10%);`,
  },
});

const theme = createTheme({
  palette: defaultTheme.palette,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 65,
        },
        indicator: {
          display: 'none',
        },
        flexContainer: {
          gap: defaultTheme.spacing(1),
        },
      },
      defaultProps: {
        centered: true,
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 65,
          minWidth: 120,
          overflow: 'hidden',
          borderRadius: 8,

          transition: defaultTheme.transitions.create(['background-color', 'color'], {
            easing: defaultTheme.transitions.easing.easeInOut,
            duration: '400ms',
          }),

          '&.Mui-selected': {
            backgroundColor: defaultTheme.palette.lightBackground,
          },
        },
        icon: {
          width: 24,
          height: 24,
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
          border: `0px solid ${defaultTheme.palette.divider}`,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          paddingTop: 0,
          paddingBottom: 0,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          overflow: 'hidden',
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
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <App />
          </LocalizationProvider>
        </CssBaseline>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
);
