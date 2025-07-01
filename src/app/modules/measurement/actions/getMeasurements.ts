import { AsyncAction } from '@app/state';
import { invokeIpcAction } from '@app/utilities';
import { Id, IMeasurement } from '@shared/models';

export const getMeasurements: AsyncAction<Id> = async ({ state }, fishId) => {
  state.measurements = [];

  const response = await invokeIpcAction<Id, IMeasurement[]>('measurement:getForFish', fishId);

  if (response.errorCode) {
    return;
  }

  state.measurements = response.data;
};
