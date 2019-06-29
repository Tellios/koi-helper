import * as React from "react";
import { Box, Typography, CircularProgress } from "@material-ui/core";
import { useAppState } from "app/state";
import { Redirect } from "react-router";

export const LoadAppView: React.FunctionComponent = () => {
  const { state, actions } = useAppState();

  React.useEffect(() => {
    if (!state.settings.loaded) {
      actions.loadSettings();
    } else if (state.activeFile === null) {
      if (state.settings.lastLoadedFile) {
        actions.loadFile(state.settings.lastLoadedFile);
      }
    }
  }, [state.settings.loaded]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
      flexDirection="column"
    >
      <CircularProgress size={70} />

      <Box m={2}>
        <Typography variant="h5">Loading...</Typography>

        {state.settings.loaded && state.fileLoaded && <Redirect to="/ponds" />}
      </Box>
    </Box>
  );
};
