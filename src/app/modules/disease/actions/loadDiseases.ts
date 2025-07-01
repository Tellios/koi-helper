import { AsyncAction } from '@app/state';
import { invokeIpcAction } from '@app/utilities';
import { IDisease } from '@shared/models';

export const loadDiseases: AsyncAction = async ({ state }) => {
  const response = await invokeIpcAction<void, IDisease[]>('disease:getAll', undefined);

  if (response.data) {
    state.diseases = response.data;
  }
};
