import { AppProgressDialog, MainBar, MainMenu, useMainMenuStore } from '@app/ui';
import { Box } from '@mui/material';
import { AnimatePresence, motion } from 'motion/react';
import * as React from 'react';
import { MemoryRouter, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useI18nStore } from './i18n';
import { DiseaseListView } from './modules/disease';
import { PondDetailsView, PondListView } from './modules/pond';
import { LoadAppView, useStartupStore } from './modules/userStartup';
import { VarietyListView } from './modules/variety';
import { SettingsDialog } from './settings';

const AnimatedOutlet: React.FunctionComponent = () => {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ display: 'flex', width: '100%', height: '100%' }}
    >
      <Outlet />
    </motion.div>
  );
};

export const App: React.FunctionComponent = () => {
  const { translationsLoaded } = useI18nStore();
  const { appLoaded, fileLoaded } = useStartupStore();
  const { appMenuOpen } = useMainMenuStore();

  return (
    <MemoryRouter>
      <AnimatePresence mode="wait">
        <Routes key="routes">
          <Route
            element={
              <>
                <Box
                  id="router-root"
                  sx={{
                    display: 'grid',
                    gridTemplateRows: 'min-content 1fr',
                    gridTemplateColumns: !fileLoaded
                      ? '0px 1fr'
                      : appMenuOpen
                        ? '280px 1fr'
                        : '70px 1fr',
                    width: '100vw',
                    height: '100vh',
                    overflow: 'hidden',
                  }}
                >
                  {translationsLoaded && <MainBar />}
                  {fileLoaded && <MainMenu />}

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
                    >
                      <AnimatedOutlet />
                    </Box>
                  </Box>
                </Box>

                {fileLoaded && <AppProgressDialog />}

                {appLoaded && <SettingsDialog />}
                <ToastContainer style={{ marginTop: 70 }} position="top-right" />
              </>
            }
          >
            <Route path="/" element={<LoadAppView />} />
            <Route path="/ponds" element={<PondListView />} />
            <Route path="/ponds/:pondId" element={<PondDetailsView />} />
            <Route path="/varieties" element={<VarietyListView />} />
            <Route path="/diseases" element={<DiseaseListView />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </MemoryRouter>
  );
};
