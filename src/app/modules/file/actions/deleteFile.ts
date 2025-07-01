import { t } from '@app/i18n';
import { AsyncAction } from '@app/state';
import { invokeIpcAction } from '@app/utilities';
import { Id } from '@shared/models';

export interface IDeleteFileParams {
  fileId: Id;
}

export const deleteFile: AsyncAction<IDeleteFileParams> = async ({ state }, { fileId }) => {
  state.appProgressOpen = true;
  state.appProgressMode = 'indeterminate';
  state.appProgressMessage = t.file.deleteProgressMessage;

  await invokeIpcAction('file:delete', fileId);

  state.appProgressOpen = false;
};
