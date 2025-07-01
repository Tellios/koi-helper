import { AsyncAction } from '@app/state';
import { invokeIpcAction } from '@app/utilities';
import { IDisease, IDiseaseBase } from '@shared/models';

export const addDisease: AsyncAction<IDiseaseBase> = async ({ state }, disease) => {
  const addedDisease = await invokeIpcAction<IDiseaseBase, IDisease>('disease:add', disease);

  if (addedDisease.data) {
    state.diseases.push(addedDisease);
  }
};
