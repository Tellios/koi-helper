import * as React from 'react';
import { IconButton } from '@mui/material';
import { Settings } from '@mui/icons-material';
import { useAppState } from '@app/state';

export const ShowSettingsButton: React.FunctionComponent = () => {
  const { actions } = useAppState();

  return (
    <IconButton color="inherit" onClick={actions.showSettings}>
      <Settings />
    </IconButton>
  );
};
