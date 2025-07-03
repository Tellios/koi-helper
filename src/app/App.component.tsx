import { AppProgressDialog, MainBar, MainMenu } from '@app/ui';
import { Box } from '@mui/material';
import * as React from 'react';
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom';
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

  return (
    <MemoryRouter>
      <Routes>
        <Route
          element={
            <>
              <Box
                id="router-root"
                sx={{
                  display: 'grid',
                  gridTemplateRows: 'min-content 1fr',
                  gridTemplateColumns: state.appMenuOpen ? '240px 1fr' : '60px 1fr',
                  width: '100vw',
                  height: '100vh',
                  overflow: 'hidden',
                }}
              >
                {state.translationsLoaded && <MainBar />}
                {state.fileLoaded && <MainMenu />}

                <Box
                  component="main"
                  sx={{
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    gridColumn: 2,
                    gridRow: 2,
                  }}
                >
                  <Box
                    id="content-root"
                    display="flex"
                    width="100%"
                    height="100%"
                    flexGrow="1"
                    bgcolor="#f5f5f5"
                    overflow="auto"
                  >
                    <Outlet />
                  </Box>
                </Box>
              </Box>

              {state.fileLoaded && <AppProgressDialog />}

              {state.appLoaded && <SettingsDialog />}
              <ToastContainer style={{ marginTop: 70 }} position="top-right" />
            </>
          }
        >
          <Route path="/" element={<LoadAppView />} />

          {state.fileLoaded && (
            <>
              <Route path="/ponds" element={<PondListView />} />
              <Route path="/ponds/:pondId" element={<PondDetailsView />} />
              <Route path="/varieties" element={<VarietyListView />} />
              <Route path="/diseases" element={<DiseaseListView />} />
            </>
          )}
        </Route>
      </Routes>
    </MemoryRouter>
  );
};
