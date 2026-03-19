import { t, useI18nStore } from '@app/i18n';
import { Box, CircularProgress, Typography } from '@mui/material';
import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStartupStore } from '../startup-store';
import { CreateOrOpenFile } from './CreateOrOpenFile';
import { FailedToLoadFileView } from './FailedToLoadFileView';

export const LoadAppView: React.FunctionComponent = () => {
  const { loadApp, appLoaded, appLoading, fileLoaded, failedToLoadFile, loadingFile } =
    useStartupStore();
  const { translationsLoaded } = useI18nStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!appLoaded && !appLoading) {
      loadApp();
    } else if (appLoaded) {
      navigate('/ponds');
    }
  }, [appLoaded, appLoading, navigate, loadApp]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
      flexDirection="column"
    >
      {(appLoading || loadingFile) && !failedToLoadFile && <CircularProgress size={35} />}

      <Box m={2}>
        {translationsLoaded && appLoading && !failedToLoadFile && (
          <Typography variant="h5" textAlign="center">
            {t.common.loading}
          </Typography>
        )}

        {failedToLoadFile && <FailedToLoadFileView />}
        {appLoaded && !loadingFile && !fileLoaded && !failedToLoadFile && <CreateOrOpenFile />}

        {/* DEBUG: show current state values to help diagnose re-rendering issues */}
        <Box mt={2} p={1} bgcolor="rgba(0,0,0,0.05)" sx={{ fontSize: 12, whiteSpace: 'pre-wrap' }}>
          <strong>DEBUG STATE</strong>
          <pre style={{ margin: 0 }}>
            {JSON.stringify(
              {
                appLoaded: appLoaded,
                appLoading: appLoading,
                fileLoaded: fileLoaded,
                failedToLoadFile: failedToLoadFile,
                translationsLoaded: translationsLoaded,
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
