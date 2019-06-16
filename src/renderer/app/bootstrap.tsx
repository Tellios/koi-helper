import * as React from "react";
import * as ReactDOM from "react-dom";
import { verbose } from "sqlite3";
import { App } from "./App.component";
import "./repositories";
import { initializeModules } from "./initializeModules";

verbose();
initializeModules();

ReactDOM.render(<App />, document.getElementById("app"));
