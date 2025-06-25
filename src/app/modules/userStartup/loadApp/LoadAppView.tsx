import * as React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useActions, useAppState } from '@app/state';
import { t } from '@app/i18n';
import { redirect } from 'react-router-dom';
import { FailedToLoadFileView } from './FailedToLoadFileView';
import { CreateOrOpenFile } from './CreateOrOpenFile';

export const LoadAppView: React.FunctionComponent = () => {
  const state = useAppState();
  const actions = useActions();

  React.useEffect(() => {
    if (!state.appLoaded && !state.appLoading) {
      actions.loadApp();
    } else if (state.fileLoaded) {
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
      {state.appLoading && <CircularProgress size={70} />}

      <Box m={2}>
        {state.translationsLoaded && state.appLoading && (
          <Typography variant="h5">{t.common.loading}</Typography>
        )}

        {state.failedToLoadFile && <FailedToLoadFileView />}
        {state.appLoaded && !state.fileLoaded && !state.failedToLoadFile && <CreateOrOpenFile />}
      </Box>
    </Box>
  );
};
