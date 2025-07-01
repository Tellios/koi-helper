import { AsyncAction } from '@app/state';
import { invokeIpcAction } from '@app/utilities';
import { IPond, IPondBase } from '@shared/models';

export const addPond: AsyncAction<IPondBase> = async ({ state }, pondToAdd) => {
  const response = await invokeIpcAction<IPondBase, IPond>('pond:add', pondToAdd);

  if (response.errorCode) {
    return;
  }

  state.ponds.push(response.data);
};
