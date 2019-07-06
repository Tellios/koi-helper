import * as React from "react";
import { Route } from "react-router";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { ShowSettingsButton } from "app/settings";
import { useAppState } from "app/state";
import { mainBarActionEmitter } from "./MainBarActionEmitter";

export const MainBar: React.FunctionComponent = () => {
  const { state } = useAppState();

  return (
    <Route
      render={({ history }) => (
        <AppBar position="sticky">
          <Toolbar>
            {state.mainBarOptions.showBackButton && (
              <IconButton color="inherit" onClick={() => history.goBack()}>
                <ArrowBack />
              </IconButton>
            )}
            <Box flexGrow={1}>
              <Typography variant="h5">{state.mainBarOptions.title}</Typography>
            </Box>
            {state.mainBarOptions.actions.map(action => {
              return (
                <Button
                  key={action.name}
                  color="inherit"
                  onClick={() => mainBarActionEmitter.emit(action.name)}
                >
                  {action.label}
                </Button>
              );
            })}
            <ShowSettingsButton />
          </Toolbar>
        </AppBar>
      )}
    />
  );
};
