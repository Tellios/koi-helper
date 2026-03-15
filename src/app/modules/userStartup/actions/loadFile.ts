import { t } from '@app/i18n';
import { AsyncAction } from '@app/state';
import { invokeIpcAction } from '@app/utilities';
import { logger } from '@shared/logger';

export const loadFile: AsyncAction<{
  filename: string;
  openFile: boolean;
}> = async ({ state, actions }, { filename, openFile }) => {
  logger.verbose(`Loading koi-helper file: ${filename}`);
  state.activeFile = filename;
  state.fileLoaded = false;
  state.failedToLoadFile = false;
  state.loadingFile = true;

  try {
    if (openFile) {
      const response = await invokeIpcAction<string, void>('userStartup:loadFile', filename);

      if (response.errorCode) {
        logger.warn(`Failed to load koi-helper file: ${response.errorCode}, ${response.message}`);
        throw new Error(response.message);
      }
    }

    logger.verbose(`Koi-helper file loaded. Initializing data.`);

    await actions.loadVarieties();
    await actions.loadDiseases();
    await actions.getPonds();

    document.title = filename;
    state.fileLoaded = true;
  } catch (err) {
    logger.error(err);

    state.failedToLoadFile = true;

    if (openFile && err instanceof Error) {
      state.loadFileErrorMessage = err.message;
    } else {
      state.loadFileErrorMessage = t.file.errors.unableToReadOrWrite;
    }
  }

  state.loadingFile = false;
};
