import { remote } from "electron";
import * as path from "path";
import { AsyncAction } from "app/state";
import { ServiceLocator } from "app/ioc";
import { ConnectionService } from "app/storage";
import { ConnectionError } from "app/storage/errors";
import { t } from "app/i18n";
import { logger } from "app/logger";
import { fileFilters } from "./utils";

export const newFile: AsyncAction = async ({ state, actions }) => {
  try {
    const result = await remote.dialog.showSaveDialog({
      filters: fileFilters
    });

    if (result.canceled || !result.filePath) {
      return;
    }

    let filename = result.filePath;
    const extension = path.extname(filename);

    if (extension !== ".khlpr") {
      filename += ".khlpr";
    }

    const connectionService = ServiceLocator.get(ConnectionService);
    await connectionService.newFile(filename);
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
