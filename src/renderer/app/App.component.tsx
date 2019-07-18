import * as React from "react";
import { Box, CssBaseline } from "@material-ui/core";
import { MemoryRouter as Router, Route } from "react-router-dom";
import { PondListView, PondDetailsView } from "./modules/pond";
import { LoadAppView } from "./modules/userStartup";
import { SettingsDialog } from "./settings";
import { useAppState } from "./state";
import { MainBar, MainMenu } from "app/ui";
import { useShellStyles } from "./ui/useShellStyles";
import { VarietyListView, VarietyDetailsView } from "./modules/variety";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const App: React.FunctionComponent = () => {
  const { state } = useAppState();
  const classes = useShellStyles();

  return (
    <Router>
      <Box display="flex" width="100%" height="100%">
        <CssBaseline />
        <MainBar />
        {state.appLoaded && <MainMenu />}

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Route path="/" exact component={LoadAppView} />
          <Route path="/ponds" exact component={PondListView} />
          <Route path="/pond/:id" component={PondDetailsView} />
          <Route path="/varieties" exact component={VarietyListView} />
          <Route path="/variety/:id" component={VarietyDetailsView} />
        </main>

        {state.appLoaded && <SettingsDialog />}
      </Box>

      <ToastContainer className={classes.toast} position="top-right" />
    </Router>
  );
};
