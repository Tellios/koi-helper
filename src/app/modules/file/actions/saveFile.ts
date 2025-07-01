import { t } from '@app/i18n';
import { AsyncAction } from '@app/state';
import { invokeIpcAction } from '@app/utilities';
import { dialog } from '@electron/remote';
import { logger } from '@shared/logger';
import { Id, IFile } from '@shared/models';
import { writeFile } from 'fs-extra';

export interface ISaveFileParams {
  fileId: Id;
}

export const saveFile: AsyncAction<ISaveFileParams> = async ({ state }, { fileId }) => {
  state.appProgressOpen = true;
  state.appProgressMessage = t.file.updateProgressMessage;
  state.appProgressMode = 'indeterminate';

  const getResponse = await invokeIpcAction<Id, IFile>('file:get', fileId);

  if (getResponse.errorCode) {
    state.appProgressOpen = false;
    logger.error(`Failed to get file: ${getResponse.message}`);
    return;
  }

  const file = getResponse.data;

  const extensionName = file.extension.substring(1);

  const result = await dialog.showSaveDialog({
    defaultPath: file.name + file.extension,
    filters: [{ name: extensionName, extensions: [extensionName] }],
  });

  if (result.canceled || result.filePath === undefined || result.filePath.length === 0) {
    return;
  }

  let filename = result.filePath;

  if (!filename.endsWith(file.extension)) {
    filename += file.extension;
  }

  const buffer = Buffer.from(file.data, 'base64');
  await writeFile(filename, buffer);

  state.appProgressOpen = false;
};
