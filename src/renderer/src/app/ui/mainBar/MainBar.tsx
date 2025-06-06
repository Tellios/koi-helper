import { ShowSettingsButton } from '@app/settings';
import { useAppState } from '@app/state';
import { ArrowBack } from '@mui/icons-material';
import { AppBar, Box, Button, IconButton, Toolbar, Typography, useTheme } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router';
import { mainBarActionEmitter } from './MainBarActionEmitter';
import { ShowAppMenuButton } from './ShowAppMenuButton';

export const MainBar: React.FunctionComponent = () => {
  const { state } = useAppState();
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <AppBar sx={{ zIndex: theme.zIndex.drawer + 1 }} position="fixed">
      <Toolbar>
        {state.mainBarOptions.showBackButton && (
          <IconButton color="inherit" onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
        )}
        <ShowAppMenuButton />
        <Box flexGrow={1}>
          <Typography variant="h5">{state.mainBarOptions.title}</Typography>
        </Box>
        {state.mainBarOptions.actions.map((action) => {
          return (
            <Button
              key={action.name}
              color="inherit"
              onClick={() => mainBarActionEmitter.emit(action.name)}
            >
              {action.label}
            </Button>
          );
        })}
        <ShowSettingsButton />
      </Toolbar>
    </AppBar>
  );
};
