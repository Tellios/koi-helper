import * as React from "react";
import { Box } from "@material-ui/core";
import { MemoryRouter as Router, Route } from "react-router-dom";
import { PondListView, PondDetailsView } from "./modules/pond";
import { LoadAppView } from "./modules/userStartup";
import { SettingsDialog } from "./settings";
import { useAppState } from "./state";
import { AppProgressDialog, MainBar, MainMenu } from "app/ui";
import { useShellStyles } from "./ui/useShellStyles";
import { VarietyListView } from "./modules/variety";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DiseaseListView } from "./modules/disease";

export const App: React.FunctionComponent = () => {
  const { state } = useAppState();
  const classes = useShellStyles();

  return (
    <Router>
      <Box id="router-root" display="flex" width="100%" height="100%">
        {state.translationsLoaded && <MainBar />}
        {state.fileLoaded && <MainMenu />}

        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Box
            id="content-root"
            display="flex"
            width="100%"
            height="100%"
            flexGrow="1"
            bgcolor="#f5f5f5"
            overflow="auto"
          >
            <Route path="/" exact component={LoadAppView} />

            {state.fileLoaded && (
              <>
                <Route path="/ponds" exact component={PondListView} />
                <Route path="/ponds/:pondId" component={PondDetailsView} />
                <Route path="/varieties" component={VarietyListView} />
                <Route path="/diseases" component={DiseaseListView} />

                <AppProgressDialog />
              </>
            )}
          </Box>
        </main>
      </Box>

      {state.appLoaded && <SettingsDialog />}
      <ToastContainer className={classes.toast} position="top-right" />
    </Router>
  );
};
