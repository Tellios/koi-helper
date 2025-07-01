import { AsyncAction } from '@app/state';
import { invokeIpcAction } from '@app/utilities';
import { Id, IFish } from '@shared/models';

export const loadPondFishes: AsyncAction<Id> = async ({ state }, pondId) => {
  const response = await invokeIpcAction<Id, IFish[]>('fish:getByPondId', pondId);

  if (response.data) {
    state.fishes = response.data;
  }
};
