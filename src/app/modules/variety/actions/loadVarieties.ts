import { AsyncAction } from '@app/state';
import { invokeIpcAction } from '@app/utilities';
import { IVariety } from '@shared/models';

export const loadVarieties: AsyncAction = async ({ state }) => {
  const response = await invokeIpcAction<void, IVariety[]>('variety:getAll', undefined);

  if (response.errorCode) {
    return;
  }

  state.varieties = response.data;
};
