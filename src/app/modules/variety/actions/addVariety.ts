import { AsyncAction } from '@app/state';
import { invokeIpcAction } from '@app/utilities';
import { IVariety, IVarietyBase } from '@shared/models';

export const addVariety: AsyncAction<IVarietyBase> = async ({ state }, variety) => {
  const response = await invokeIpcAction<IVarietyBase, IVariety>('variety:add', variety);

  if (response.errorCode) {
    return;
  }

  state.varieties.push(response.data);
};
