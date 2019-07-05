import * as React from "react";
import { Box, Typography, CircularProgress } from "@material-ui/core";
import { useAppState } from "app/state";
import { t } from "app/i18n";
import { Redirect } from "react-router";

export const LoadAppView: React.FunctionComponent = () => {
  const { state, actions } = useAppState();

  React.useEffect(() => {
    if (!state.settings.loaded) {
      actions.loadSettings();
    } else if (!state.translationsLoaded) {
      actions.loadTranslations(state.settings.settings.language);
    } else if (state.activeFile === null) {
      if (state.settings.settings.lastLoadedFile) {
        actions.loadFile(state.settings.settings.lastLoadedFile);
      }
    }
  }, [state.settings.loaded, state.translationsLoaded]);

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
        {state.translationsLoaded && (
          <Typography variant="h5">{t.common.loading}</Typography>
        )}

        {state.translationsLoaded &&
          state.settings.loaded &&
          state.fileLoaded && <Redirect to="/ponds" />}
      </Box>
    </Box>
  );
};
