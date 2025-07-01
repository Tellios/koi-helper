import { AsyncAction } from '@app/state';
import { invokeIpcAction } from '@app/utilities';
import { IPond } from '@shared/models';

export const getPonds: AsyncAction = async ({ state }) => {
  const response = await invokeIpcAction<void, IPond[]>('pond:getAll', undefined);

  if (response.errorCode) {
    state.ponds = [];
    return;
  }

  state.ponds = response.data;
};
