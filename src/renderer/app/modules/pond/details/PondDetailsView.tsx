import * as React from "react";
import { Typography, Box, Divider } from "@material-ui/core";
import { InfoPanel } from "./InfoPanel";
import { useAppState } from "app/state";
import { RouteComponentProps } from "react-router";

export const PondDetailsView: React.FunctionComponent<
  RouteComponentProps<{ id: string }>
> = ({ match }) => {
  const { state } = useAppState();
  const pond = state.ponds.filter(pond => pond.id === match.params.id)[0];

  return (
    <Box m={2}>
      <InfoPanel pond={pond} />

      <Box mt={2} mb={2}>
        <Divider />
      </Box>

      <Typography variant="h4">Animals</Typography>
      <Typography>Lorem ipsum dolor sit amet consectetur</Typography>
    </Box>
  );
};
