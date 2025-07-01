import { AsyncAction } from '@app/state';
import { invokeIpcAction } from '@app/utilities';
import { IFish, IFishBase } from '@shared/models';

export const addFish: AsyncAction<IFishBase> = async ({ state }, fishToAdd) => {
  const response = await invokeIpcAction<IFishBase, IFish>('fish:add', fishToAdd);

  if (response.data) {
    state.fishes.push(response.data);
  }
};
