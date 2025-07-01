import { t } from '@app/i18n';
import { AsyncAction } from '@app/state';
import { invokeIpcAction } from '@app/utilities';
import { dialog } from '@electron/remote';
import { logger } from '@shared/logger';
import * as path from 'path';
import { fileFilters } from './utils';

export const newFile: AsyncAction = async ({ state, actions }) => {
  try {
    const result = await dialog.showSaveDialog({
      filters: fileFilters,
    });

    if (result.canceled || !result.filePath) {
      return;
    }

    let filename = result.filePath;
    const extension = path.extname(filename);

    if (extension !== '.khlpr') {
      filename += '.khlpr';
    }

    const response = await invokeIpcAction<string, void>('userStartup:newFile', filename);

    if (response.errorCode) {
      throw new Error(response.message);
    }

    await actions.updateSettings({ lastLoadedFile: filename });
    await actions.loadFile({ filename, openFile: false });
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error creating new file: ${err.message}\nStack: ${err.stack}`);
    } else {
      logger.error(err);
    }

    state.failedToLoadFile = true;
    state.loadFileErrorMessage = t.file.errors.unableToReadOrWrite;
  }
};
