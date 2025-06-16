import { useActions } from '@app/state';
import { Settings } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import * as React from 'react';

export const ShowSettingsButton: React.FunctionComponent = () => {
  const actions = useActions();

  return (
    <IconButton color="inherit" onClick={actions.showSettings}>
      <Settings />
    </IconButton>
  );
};
