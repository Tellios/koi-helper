import * as React from "react";
import { Typography, Box, Paper, Divider } from "@material-ui/core";
import { InfoPanel } from "./InfoPanel";
import { useAppState } from "app/state";

export const PondDetailsView: React.FunctionComponent<
  RouteComponentProps<{ id: string }>
> = ({ match }) => {
  const { state, actions } = useAppState();
  const pond = state.ponds.filter(pond => pond.id === match.params.id)[0];

  React.useEffect(() => {
    actions.setMainBar({
      title: pond.name,
      showBackButton: true,
      actions: []
    });
  });

  return (
    <Box>
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
  );
};
