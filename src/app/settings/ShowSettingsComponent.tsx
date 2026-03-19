import { Settings } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import * as React from 'react';
import { useSettingsStore } from './settings-store';

export const ShowSettingsButton: React.FunctionComponent = () => {
  const { showSettings } = useSettingsStore();

  return (
    <IconButton color="inherit" onClick={showSettings}>
      <Settings />
    </IconButton>
  );
};
