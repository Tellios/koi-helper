import * as React from "react";
import { Box, Typography, CircularProgress } from "@material-ui/core";
import { useAppState } from "app/state";
import { t } from "app/i18n";
import { Redirect } from "react-router";
import { FailedToLoadFileView } from "./FailedToLoadFileView";
import { CreateOrOpenFile } from "./CreateOrOpenFile";

export const LoadAppView: React.FunctionComponent = () => {
  const { state, actions } = useAppState();

  React.useEffect(() => {
    if (!state.appLoaded && !state.appLoading) {
      actions.loadApp();
    }
  });

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
      flexDirection="column"
    >
      {state.appLoading && <CircularProgress size={70} />}

      <Box m={2}>
        {state.translationsLoaded && state.appLoading && (
          <Typography variant="h5">{t.common.loading}</Typography>
        )}

        {state.fileLoaded && <Redirect to="/ponds" />}
        {state.failedToLoadFile && <FailedToLoadFileView />}
        {state.appLoaded && !state.fileLoaded && <CreateOrOpenFile />}
      </Box>
    </Box>
  );
};
