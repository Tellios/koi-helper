import { ShowSettingsButton } from '@app/settings';
import { ArrowBack } from '@mui/icons-material';
import { AppBar, Box, Button, IconButton, Toolbar, Typography, useTheme } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router';
import { mainBarActionEmitter } from './MainBarActionEmitter';
import { ShowAppMenuButton } from './ShowAppMenuButton';
import { useMainBarStore } from './main-bar-store';

export const MainBar: React.FunctionComponent = () => {
  const { showBackButton, actions, title } = useMainBarStore();
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <AppBar
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        gridColumnStart: 1,
        gridColumnEnd: 2,
        width: '100vw',
        border: 'none',
      }}
      elevation={0}
      position="static"
    >
      <Toolbar style={{ paddingLeft: '8px', paddingRight: '8px' }}>
        {showBackButton && (
          <IconButton color="inherit" onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
        )}

        <ShowAppMenuButton />

        <Box flexGrow={1} px={2}>
          <Typography variant="h5">{title}</Typography>
        </Box>

        {actions.map((action) => {
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
