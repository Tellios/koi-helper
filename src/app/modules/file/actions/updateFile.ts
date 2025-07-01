import { t } from '@app/i18n';
import { AsyncAction } from '@app/state';
import { invokeIpcAction, selectFiles } from '@app/utilities';
import { Id } from '@shared/models';
import { fileFilters } from '../utils';

export interface IUpdateFileParams {
  fileId: Id;
}

export const updateFile: AsyncAction<IUpdateFileParams> = async ({ state }, { fileId }) => {
  const result = await selectFiles({
    mode: 'singleSelect',
    filters: fileFilters,
  });

  if (result.filePaths?.length === 0) {
    return;
  }

  state.appProgressOpen = true;
  state.appProgressMessage = t.file.updateProgressMessage;
  state.appProgressMode = 'indeterminate';

  const filename = result.filePaths[0];

  await invokeIpcAction('file:update', { fileId, filename });

  state.appProgressOpen = false;
};
