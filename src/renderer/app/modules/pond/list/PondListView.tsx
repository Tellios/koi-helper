import * as React from "react";
import {
  Box,
  List,
  AppBar,
  Toolbar,
  Typography,
  Button
} from "@material-ui/core";
import { PondItem } from "./PondItem";
import { useAppState } from "app/state";
import { sortItems } from "./sortItems";

export const PondListView: React.FunctionComponent = () => {
  const { state, actions } = useAppState();

  if (state.ponds.length === 0) {
    actions.getPonds();
  }

  const listItems = state.ponds
    .filter(pond => (state.showArchivedPonds ? true : !pond.archived))
    .sort(sortItems)
    .map(pond => <PondItem key={pond.id} pond={pond} />);

  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar>
          <Box flexGrow={1}>
            <Typography variant="h5">List stuff</Typography>
          </Box>
          <Button
            color="inherit"
            onClick={() =>
              actions.addPond({
                name: "Yo yo",
                length: 2000,
                width: 145,
                volume: 1200,
                depth: 3,
                archived: false,
                treatments: []
              })
            }
          >
            Add pond
          </Button>
          <Button
            color="inherit"
            onClick={() => actions.toggleShowArchivedPonds()}
          >
            {state.showArchivedPonds ? "Hide archived" : "Show archived"}
          </Button>
        </Toolbar>
      </AppBar>
      <List>{listItems}</List>
    </Box>
  );
};
