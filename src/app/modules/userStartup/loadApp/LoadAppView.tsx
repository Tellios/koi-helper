import { t } from '@app/i18n';
import { useAppStore } from '@app/state';
import { Box, CircularProgress, Typography } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateOrOpenFile } from './CreateOrOpenFile';
import { FailedToLoadFileView } from './FailedToLoadFileView';
import { loadApp } from '../actions';

export const LoadAppView: React.FunctionComponent = () => {
  const state = useAppStore();
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log('LoadAppView effect', {
      appLoaded: state.appLoaded,
      appLoading: state.appLoading,
      fileLoaded: state.fileLoaded,
    });

    if (!state.appLoaded && !state.appLoading) {
      loadApp(state);
    } else if (state.appLoaded) {
      navigate('/ponds');
    }
  }, [state.appLoaded, state.appLoading, state.fileLoaded, actions.loadApp, actions, navigate]);

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

        {/* DEBUG: show current state values to help diagnose re-rendering issues */}
        <Box mt={2} p={1} bgcolor="rgba(0,0,0,0.05)" sx={{ fontSize: 12, whiteSpace: 'pre-wrap' }}>
          <strong>DEBUG STATE</strong>
          <pre style={{ margin: 0 }}>
            {JSON.stringify(
              {
                appLoaded: state.appLoaded,
                appLoading: state.appLoading,
                fileLoaded: state.fileLoaded,
                failedToLoadFile: state.failedToLoadFile,
                translationsLoaded: state.translationsLoaded,
              },
              null,
              2,
            )}
          </pre>
        </Box>
      </Box>
    </Box>
  );
};
