import { AppProgressDialog, MainBar, MainMenu } from '@app/ui';
import { Box, useTheme } from '@mui/material';
import * as React from 'react';
import { Route, MemoryRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DiseaseListView } from './modules/disease';
import { PondDetailsView, PondListView } from './modules/pond';
import { LoadAppView } from './modules/userStartup';
import { VarietyListView } from './modules/variety';
import { SettingsDialog } from './settings';
import { useAppState } from './state';

export const App: React.FunctionComponent = () => {
  const state = useAppState();
  const theme = useTheme();

  return (
    <Router>
      <Box id="router-root" display="flex" width="100%" height="100%">
        {state.translationsLoaded && <MainBar />}
        {state.fileLoaded && <MainMenu />}

        <Box
          component="main"
          sx={{
            overflow: 'hidden',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={theme.mixins.toolbar} />

          <Box
            id="content-root"
            display="flex"
            width="100%"
            height="100%"
            flexGrow="1"
            bgcolor="#f5f5f5"
            overflow="auto"
          >
            <Route path="/" element={<LoadAppView />} />

            {state.fileLoaded && (
              <>
                <Route path="/ponds" element={<PondListView />} />
                <Route path="/ponds/:pondId" element={<PondDetailsView />} />
                <Route path="/varieties" element={<VarietyListView />} />
                <Route path="/diseases" element={<DiseaseListView />} />

                <AppProgressDialog />
              </>
            )}
          </Box>
        </Box>
      </Box>

      {state.appLoaded && <SettingsDialog />}
      <ToastContainer style={{ marginTop: 70 }} position="top-right" />
    </Router>
  );
};
