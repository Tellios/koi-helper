import { AsyncAction, replaceItem } from '@app/state';
import { invokeIpcAction } from '@app/utilities';
import { IFish } from '@shared/models';

export const updateFish: AsyncAction<IFish> = async ({ state }, fishToUpdate) => {
  const response = await invokeIpcAction<IFish, IFish>('fish:update', fishToUpdate);

  if (response.data) {
    state.fishes = replaceItem(state.fishes, response.data);
  }
};
