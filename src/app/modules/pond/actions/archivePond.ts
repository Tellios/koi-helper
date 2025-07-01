import { AsyncAction, replaceItem } from '@app/state';
import { invokeIpcAction } from '@app/utilities';
import { IPond } from '@shared/models';

export const archivePond: AsyncAction<IPond> = async ({ state }, pondToArchive) => {
  const response = await invokeIpcAction<IPond, IPond>('pond:archive', pondToArchive);

  if (response.errorCode) {
    return;
  }

  state.ponds = replaceItem(state.ponds, response.data);
};
