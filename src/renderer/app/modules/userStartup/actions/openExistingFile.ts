import { remote } from "electron";
import { AsyncAction } from "app/state";
import { ServiceLocator } from "app/ioc";
import { ConnectionService, ConnectionError } from "app/storage";
import { t } from "app/i18n";
import { logger } from "app/logger";
import { fileFilters } from "./utils";
import { selectFiles } from "app/utilities";

export const openExistingFile: AsyncAction = async ({ state, actions }) => {
  try {
    const result = await selectFiles({
      mode: "singleSelect",
      filters: fileFilters
    });

    if (!result.filePaths || result.filePaths.length === 0) {
      return;
    }

    let filename = result.filePaths[0];

    const connectionService = ServiceLocator.get(ConnectionService);
    await connectionService.openFile(filename);
    await actions.updateSettings({ lastLoadedFile: filename });
    await actions.loadFile({ filename, openFile: false });
  } catch (err) {
    logger.error(err);

    state.failedToLoadFile = true;

    if (err instanceof ConnectionError) {
      state.loadFileErrorMessage = err.message;
    } else {
      state.loadFileErrorMessage = t.file.errors.unableToReadOrWrite;
    }
  }
};
