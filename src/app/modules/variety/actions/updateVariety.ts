import { AsyncAction, replaceItem } from '@app/state';
import { invokeIpcAction } from '@app/utilities';
import { IVariety } from '@shared/models';

export const updateVariety: AsyncAction<IVariety> = async ({ state }, variety) => {
  const response = await invokeIpcAction<IVariety, IVariety>('variety:update', variety);

  if (response.errorCode) {
    return;
  }

  state.varieties = replaceItem(state.varieties, response.data);
};
