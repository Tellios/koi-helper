import { AsyncAction, replaceItem } from '@app/state';
import { invokeIpcAction } from '@app/utilities';
import { IPond } from '@shared/models';

export const updatePond: AsyncAction<IPond> = async ({ state }, pondToUpdate) => {
  const response = await invokeIpcAction<IPond, IPond>('pond:update', pondToUpdate);

  if (response.errorCode) {
    return;
  }

  state.ponds = replaceItem(state.ponds, response.data);
};
