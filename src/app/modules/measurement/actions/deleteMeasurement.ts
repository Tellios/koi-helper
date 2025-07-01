import { AsyncAction, removeItem } from '@app/state';
import { Id } from '@shared/models';
import { invokeIpcAction } from '@app/utilities';

export const deleteMeasurement: AsyncAction<Id> = async ({ state }, measurementId) => {
  const response = await invokeIpcAction<Id, void>('measurement:delete', measurementId);

  if (response.errorCode) {
    return;
  }

  state.measurements = removeItem(state.measurements, measurementId);
};
