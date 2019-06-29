import * as React from "react";
import * as ReactDOM from "react-dom";
import { verbose } from "sqlite3";
import { App } from "./App.component";
import "./storage";
import { initializeModules } from "./initializeModules";
import { getConfig } from "./state";
import { createOvermind } from "overmind";
import { Provider } from "overmind-react";
import { logger } from "./logger";

logger.verbose("Bootstraping modules");
verbose();
initializeModules();

logger.verbose("Setting up overmind");
const overmind = createOvermind(getConfig());

logger.verbose("Starting app UI");
ReactDOM.render(
  <Provider value={overmind}>
    <App />
  </Provider>,
  document.getElementById("app")
);
