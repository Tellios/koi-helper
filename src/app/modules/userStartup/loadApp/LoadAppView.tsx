import { useI18nStore } from '@app/i18n';
import { Box, CircularProgress, Typography } from '@mui/material';
import { t } from '@shared/i18n';
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

  console.log('LoadAppView rendered', { appLoaded, appLoading, fileLoaded, failedToLoadFile });

  useEffect(() => {
    if (!appLoaded && !appLoading) {
      loadApp();
    } else if (appLoaded && fileLoaded && !failedToLoadFile) {
      navigate('/ponds');
    }
  }, [appLoaded, fileLoaded, failedToLoadFile, appLoading, navigate, loadApp]);

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
      </Box>
    </Box>
  );
};
