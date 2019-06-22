import * as React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Paper,
  Divider
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { Route, RouteComponentProps } from "react-router";
import { InfoPanel } from "./InfoPanel";
import { useAppState } from "../../../state";
import { toNumber } from "lodash";

export const PondDetailsView: React.FunctionComponent<
  RouteComponentProps<{ id: string }>
> = ({ match }) => {
  const { state } = useAppState();
  const pond = state.ponds.filter(
    pond => pond.Id === toNumber(match.params.id)
  )[0];

  return (
    <Route
      render={({ history }) => (
        <Box>
          <AppBar position="sticky">
            <Toolbar>
              <IconButton color="inherit" onClick={() => history.goBack()}>
                <ArrowBack />
              </IconButton>
              <Typography variant="h5">{pond.Name}</Typography>
            </Toolbar>
          </AppBar>

          <Box m={1}>
            <InfoPanel pond={pond} />
          </Box>

          <Divider />

          <Box m={1}>
            <Paper>
              <Typography variant="h4">Animals</Typography>
              <Typography>Lorem ipsum dolor sit amet consectetur</Typography>
            </Paper>
          </Box>
        </Box>
      )}
    />
  );
};
