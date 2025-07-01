import { t } from '@app/i18n';
import { AsyncAction, Context } from '@app/state';
import { invokeIpcAction, selectFiles } from '@app/utilities';
import { logger } from '@shared/logger';
import { fileFilters } from './utils';

export const openExistingFile: AsyncAction = async ({ state, actions }: Context) => {
  try {
    const result = await selectFiles({
      mode: 'singleSelect',
      filters: fileFilters,
    });

    if (!result.filePaths || result.filePaths.length === 0) {
      return;
    }

    const filename = result.filePaths[0];

    const response = await invokeIpcAction<string, void>('userStartup:openFile', filename);

    if (response.errorCode) {
      throw new Error(response.message);
    }

    await actions.updateSettings({ lastLoadedFile: filename });
    await actions.loadFile({ filename, openFile: false });
  } catch (err) {
    logger.error(err);

    state.failedToLoadFile = true;
    state.loadFileErrorMessage = t.file.errors.unableToReadOrWrite;
  }
};
