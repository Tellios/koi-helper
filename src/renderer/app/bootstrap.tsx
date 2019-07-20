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
      main: "#33691e"
    }
  }
});

logger.verbose("Starting app UI");
ReactDOM.render(
  <Provider value={overmind}>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <App />
      </CssBaseline>
    </ThemeProvider>
  </Provider>,
  document.getElementById("app")
);
