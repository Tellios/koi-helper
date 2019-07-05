import * as React from "react";
import { Box, createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { MemoryRouter as Router, Route } from "react-router-dom";
import { PondListView, PondDetailsView } from "./modules/pond";
import { LoadAppView } from "./modules/userStartup";
import { SettingsDialog } from "./settings";
import { useAppState } from "./state";

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

export const App: React.FunctionComponent = () => {
  const { state } = useAppState();

  return (
    <ThemeProvider theme={theme}>
      <Box width="100%" height="100%">
        <Router>
          <Route path="/" exact component={LoadAppView} />
          <Route path="/ponds" exact component={PondListView} />
          <Route path="/pond/:id" component={PondDetailsView} />
        </Router>

        {state.settings.loaded && state.translationsLoaded && (
          <SettingsDialog />
        )}
      </Box>
    </ThemeProvider>
  );
};
