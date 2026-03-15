import { t } from '@app/i18n';
import { useActions, useAppState } from '@app/state';
import { Box, CircularProgress, Typography } from '@mui/material';
import * as React from 'react';
import { redirect } from 'react-router-dom';
import { CreateOrOpenFile } from './CreateOrOpenFile';
import { FailedToLoadFileView } from './FailedToLoadFileView';

export const LoadAppView: React.FunctionComponent = () => {
  const state = useAppState();
  const actions = useActions();

  React.useEffect(() => {
    if (!state.appLoaded && !state.appLoading) {
      actions.loadApp();
    } else if (state.appLoaded) {
      redirect('/ponds');
    }
  }, [state.appLoaded, state.appLoading, state.fileLoaded, actions]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
      flexDirection="column"
    >
      {(state.appLoading || state.loadingFile) && <CircularProgress size={35} />}

      <Box m={2}>
        {state.translationsLoaded && state.appLoading && (
          <Typography variant="h5">{t.common.loading}</Typography>
        )}

        {state.failedToLoadFile && <FailedToLoadFileView />}
        {state.appLoaded && !state.loadingFile && !state.fileLoaded && !state.failedToLoadFile && (
          <CreateOrOpenFile />
        )}
      </Box>
    </Box>
  );
};
