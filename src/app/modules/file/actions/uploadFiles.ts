import { t } from '@app/i18n';
import { AsyncAction } from '@app/state';
import { invokeIpcAction, selectFiles } from '@app/utilities';
import { Id, IFileBase, IFileReference } from '@shared/models';
import { readFile } from 'fs-extra';
import * as path from 'path';
import { fileFilters } from '../utils';

export interface IUploadFilesParams {
  referenceId: Id;
}

export const uploadFiles: AsyncAction<IUploadFilesParams> = async ({ state }, { referenceId }) => {
  const result = await selectFiles({
    mode: 'multiSelect',
    filters: fileFilters,
  });

  if (result.filePaths?.length === 0) {
    return;
  }

  state.appProgressOpen = true;
  state.appProgressMessage = t.file.uploadProgressMessage;
  state.appProgressMode = 'count';
  state.appProgressTotalCount = result.filePaths.length;
  state.appProgressCurrentCount = 0;

  await Promise.all(
    result.filePaths.map(async (filename) => {
      const { name, ext } = path.parse(filename);

      const fileBuffer = await readFile(filename);

      const addedFile = await invokeIpcAction<IFileBase, IFileReference>('file:add', {
        name,
        extension: ext,
        reference: referenceId,
        data: fileBuffer.toString('base64'),
      });

      state.appProgressCurrentCount = state.appProgressCurrentCount + 1;

      return addedFile;
    }),
  );

  state.appProgressOpen = false;
};
