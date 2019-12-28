import * as React from "react";
import * as ReactDOM from "react-dom";
import { verbose } from "sqlite3";
import "app/i18n";
import { App } from "./App.component";
import "./storage";
import { initializeModules } from "./initializeModules";
import { getConfig } from "./state";
import { createOvermind } from "overmind";
import { Provider } from "overmind-react";
import { logger } from "./logger";
import { createMuiTheme, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

logger.verbose("Bootstraping modules");
verbose();
initializeModules();

logger.verbose("Setting up overmind");
const overmind = createOvermind(getConfig());

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#388e3c"
    },
    secondary: {
      // main: "#33691e"
      main: "#9c27b0"
    }
  },
  overrides: {
    MuiTabs: {
      root: {
        marginBottom: 16
      }
    },
    MuiCard: {
      root: {
        margin: 8
      }
    }
  }
});

logger.verbose("Starting app UI");
ReactDOM.render(
  <Provider value={overmind}>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <App />
        </MuiPickersUtilsProvider>
      </CssBaseline>
    </ThemeProvider>
  </Provider>,
  document.getElementById("app")
);
