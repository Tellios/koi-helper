import { t } from '@app/i18n';
import { AsyncAction, removeItem } from '@app/state';
import { invokeIpcAction } from '@app/utilities';
import { IPond } from '@shared/models';

export const deletePond: AsyncAction<IPond> = async ({ state }, pondToDelete) => {
  state.appProgressOpen = true;
  state.appProgressMode = 'indeterminate';
  state.appProgressMessage = t.pond.deleteProgressMessage;

  const response = await invokeIpcAction('pond:delete', pondToDelete);

  state.appProgressOpen = false;

  if (response.errorCode) {
    return;
  }

  state.ponds = removeItem(state.ponds, pondToDelete.id);
};
