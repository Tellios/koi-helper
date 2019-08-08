import * as React from "react";
import { Typography, Box, Divider } from "@material-ui/core";
import { InfoPanel } from "./InfoPanel";
import { useAppState } from "app/state";
import { RouteComponentProps } from "react-router";
import { FishListHeaderView, FishListView } from "app/modules/fish";

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
    <Box m={2}>
      <InfoPanel pond={pond} />

      <Box mt={2} mb={2}>
        <Divider />
      </Box>

      <FishListHeaderView pondId={pond.id} />
      <FishListView pondId={pond.id} />
    </Box>
  );
};
