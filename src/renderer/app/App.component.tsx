import * as React from "react";
import { Box } from "@material-ui/core";
import { MemoryRouter as Router, Route } from "react-router-dom";
import { PondListView, PondDetailsView } from "./modules/pond";
import { LoadAppView } from "./modules/userStartup";

export const App: React.FunctionComponent = () => {
  return (
    <Router>
      <Box width="100%" height="100%">
        <Route path="/" exact component={LoadAppView} />
        <Route path="/ponds" exact component={PondListView} />
        <Route path="/pond/:id" component={PondDetailsView} />
      </Box>
    </Router>
  );
};
