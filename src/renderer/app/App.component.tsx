import * as React from "react";
import { Box } from "@material-ui/core";
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
import { DiseaseListView, DiseaseDetailsView } from "./modules/disease";
import { FishDetailsView } from "./modules/fish";

export const App: React.FunctionComponent = () => {
  const { state } = useAppState();
  const classes = useShellStyles();

  return (
    <Router>
      <Box display="flex" width="100%" height="100%">
        <MainBar />
        {state.fileLoaded && <MainMenu />}

        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Box display="flex" width="100%" height="100%" bgcolor="white">
            <Route path="/" exact component={LoadAppView} />

            {state.fileLoaded && (
              <>
                <Box
                  minWidth={380}
                  height="100%"
                  m={1}
                  className={classes.firstColumn}
                >
                  <Route path="/ponds" exact component={PondListView} />
                  <Route
                    path={["/ponds/:pondId", "/ponds/:pondId/fish/:fishId"]}
                    component={PondDetailsView}
                  />
                  <Route path="/varieties" component={VarietyListView} />
                  <Route path="/diseases" component={DiseaseListView} />
                </Box>

                <Box width="100%" height="100%" m={2}>
                  <Route
                    path="/varieties/:varietyId"
                    component={VarietyDetailsView}
                  />
                  <Route
                    path="/diseases/:diseaseId"
                    component={DiseaseDetailsView}
                  />
                  <Route
                    path="/ponds/:pondId/fish/:fishId"
                    component={FishDetailsView}
                  />
                </Box>
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
