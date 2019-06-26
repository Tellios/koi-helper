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

export const PondListView: React.FunctionComponent = () => {
  const { state, actions } = useAppState();

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
                Name: "Yo yo",
                Depth: 3,
                Length: 2000,
                Liters: 1200,
                Width: 145
              })
            }
          >
            Add pond
          </Button>
        </Toolbar>
      </AppBar>
      <List>
        {state.ponds.map(pond => (
          <PondItem key={pond.Id} pond={pond} />
        ))}
      </List>
    </Box>
  );
};
