import * as React from "react";
import { Box } from "@material-ui/core";
import { MemoryRouter as Router, Route } from "react-router-dom";
import { PondListView } from "./modules/pond";
import { PondDetailsView } from "./modules/pond/details/PondDetailsView";

export const App: React.FunctionComponent = () => {
  return (
    <Router>
      <Box>
        <Route path="/" exact component={PondListView} />
        <Route path="/pond/:id" component={PondDetailsView} />
      </Box>
    </Router>
  );
};
