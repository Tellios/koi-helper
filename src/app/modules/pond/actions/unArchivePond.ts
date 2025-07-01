import { AsyncAction, replaceItem } from '@app/state';
import { invokeIpcAction } from '@app/utilities';
import { IPond } from '@shared/models';

export const unArchivePond: AsyncAction<IPond> = async ({ state }, pondToUnArchive) => {
  const response = await invokeIpcAction<IPond, IPond>('pond:unArchive', pondToUnArchive);

  if (response.errorCode) {
    return;
  }

  state.ponds = replaceItem(state.ponds, response.data);
};
