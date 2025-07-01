import { AsyncAction, replaceItem } from '@app/state';
import { invokeIpcAction } from '@app/utilities';
import { IDisease } from '@shared/models';

export const updateDisease: AsyncAction<IDisease> = async ({ state }, disease) => {
  const response = await invokeIpcAction<IDisease, IDisease>('disease:update', disease);

  if (response.data) {
    state.diseases = replaceItem(state.diseases, response.data);
  }
};
