import { t } from '@shared/i18n';
import { useSettingsStore } from '@app/settings';
import { Box, Typography } from '@mui/material';
import * as React from 'react';
import { useStartupStore } from '../startup-store';
import { CreateOrOpenFile } from './CreateOrOpenFile';

export const FailedToLoadFileView: React.FunctionComponent = () => {
  const { loadFileErrorMessage } = useStartupStore();
  const { settings } = useSettingsStore();

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h4" gutterBottom>
        {t.file.errors.errorViewHeader}
      </Typography>
      <Typography>{loadFileErrorMessage}</Typography>

      <Typography>{settings.lastLoadedFile}</Typography>

      <Box mt={2}>
        <CreateOrOpenFile />
      </Box>
    </Box>
  );
};
