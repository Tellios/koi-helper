import { AsyncAction } from '@app/state';
import { logger } from '@shared/logger';

export const loadApp: AsyncAction = async ({ state, actions }) => {
  logger.verbose(`Loading app`);
  state.appLoading = true;

  await actions.loadSettings();
  await actions.loadTranslations(state.settings.settings.language);

  if (state.settings.settings.lastLoadedFile) {
    await actions.loadFile({
      filename: state.settings.settings.lastLoadedFile,
      openFile: true,
    });
  }

  logger.verbose(`App loaded`);
  state.appLoaded = true;
  state.appLoading = false;
};
