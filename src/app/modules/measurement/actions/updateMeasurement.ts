import { AsyncAction, replaceItem } from '@app/state';
import { invokeIpcAction } from '@app/utilities';
import { IMeasurement } from '@shared/models';

export const updateMeasurement: AsyncAction<IMeasurement> = async ({ state }, measurement) => {
  const response = await invokeIpcAction<IMeasurement, IMeasurement>(
    'measurement:update',
    measurement,
  );

  if (response.errorCode) {
    return;
  }

  state.measurements = replaceItem(state.measurements, response.data);
};
