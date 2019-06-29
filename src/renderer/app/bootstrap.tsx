import * as React from "react";
import * as ReactDOM from "react-dom";
import { verbose } from "sqlite3";
import { App } from "./App.component";
import "./storage";
import { initializeModules } from "./initializeModules";
import { getConfig } from "./state";
import { createOvermind } from "overmind";
import { Provider } from "overmind-react";

verbose();
initializeModules();

const overmind = createOvermind(getConfig());

ReactDOM.render(
  <Provider value={overmind}>
    <App />
  </Provider>,
  document.getElementById("app")
);
