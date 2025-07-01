import { t } from '@app/i18n';
import { AsyncAction, removeItem } from '@app/state';
import { invokeIpcAction } from '@app/utilities';
import { Id } from '@shared/models';
import { toast } from 'react-toastify';

export const deleteDisease: AsyncAction<Id> = async ({ state }, diseaseId) => {
  state.appProgressOpen = true;
  state.appProgressMode = 'indeterminate';
  state.appProgressMessage = t.disease.deleteProgressMessage;

  const response = await invokeIpcAction<Id, void>('disease:delete', diseaseId);

  if (response.errorCode) {
    if (response.errorCode === 'REFERENCED_BY_ENTITY') {
      toast.warn(response.message);
    }
  } else {
    state.diseases = removeItem(state.diseases, diseaseId);
  }

  state.appProgressOpen = false;
};
