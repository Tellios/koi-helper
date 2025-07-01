import { t } from '@app/i18n';
import { AsyncAction, removeItem } from '@app/state';
import { invokeIpcAction } from '@app/utilities';
import { logger } from '@shared/logger';
import { Id } from '@shared/models';
import { toast } from 'react-toastify';

export const deleteVariety: AsyncAction<Id> = async ({ state }, varietyId) => {
  state.appProgressOpen = true;
  state.appProgressMode = 'indeterminate';
  state.appProgressMessage = t.variety.deleteProgressMessage;

  const response = await invokeIpcAction<Id, void>('variety:delete', varietyId);

  state.appProgressOpen = false;

  if (response.errorCode) {
    if (response.errorCode === 'REFERENCED_BY_ENTITY') {
      toast.warn(response.message);
    } else {
      logger.error(response.message);
    }

    return;
  }

  state.varieties = removeItem(state.varieties, varietyId);
};
