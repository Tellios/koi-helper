import { AsyncAction } from "app/state";
import { ConnectionError } from "app/storage/errors";
import { t } from "app/i18n";
import { logger } from "app/logger";
import { ServiceLocator } from "app/ioc";
import { ConnectionService } from "app/storage";

export const loadFile: AsyncAction<{
  filename: string;
  openFile: boolean;
}> = async ({ state, actions }, { filename, openFile }) => {
  state.activeFile = filename;
  state.fileLoaded = false;
  state.failedToLoadFile = false;
  state.loadingFile = true;

  try {
    if (openFile) {
      const connectionService = ServiceLocator.get(ConnectionService);
      await connectionService.openFile(filename);
    }

    await actions.loadVarieties();
    await actions.loadDiseases();

    document.title = filename;
    state.fileLoaded = true;
  } catch (err) {
    logger.error(err);

    state.failedToLoadFile = true;

    if (err instanceof ConnectionError) {
      state.loadFileErrorMessage = err.message;
    } else {
      state.loadFileErrorMessage = t.file.errors.unableToReadOrWrite;
    }
  }

  state.loadingFile = false;
};
