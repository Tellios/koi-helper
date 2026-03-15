import { AsyncAction } from '@app/state';
import { invokeIpcAction } from '@app/utilities';
import { logger } from '@shared/logger';
import { IAppSettings } from '@shared/models';

export const loadSettings: AsyncAction = async ({ state }) => {
  logger.verbose(`Loading settings`);
  const response = await invokeIpcAction<void, IAppSettings>('settings:getAll', undefined);

  if (response.errorCode) {
    logger.verbose(`Failed to load translation files: ${response.errorCode}, ${response.message}`);
    logger.verbose(`Using default settings instead`);
    state.settings = {
      settings: {
        language: 'en',
        lastLoadedFile: undefined,
      },
      loaded: true,
      showDialog: false,
    };
    return;
  }

  logger.verbose(`Settings loaded: ${JSON.stringify(response.data, null, 2)}`);

  state.settings = {
    settings: response.data,
    loaded: true,
    showDialog: false,
  };
};
