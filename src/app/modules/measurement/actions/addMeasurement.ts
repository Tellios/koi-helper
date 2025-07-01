import { AsyncAction } from '@app/state';
import { IMeasurementBase, Id } from '@shared/models';
import { invokeIpcAction } from '@app/utilities';
import { IMeasurement } from '@shared/models';

export interface IMeasurementAddParams {
  measurement: IMeasurementBase;
  fish: Id;
}

export const addMeasurement: AsyncAction<IMeasurementAddParams> = async ({ state }, input) => {
  const added = await invokeIpcAction<IMeasurementAddParams, IMeasurement>(
    'measurement:add',
    input,
  );

  if (added.errorCode) {
    return;
  }

  state.measurements = [added.data, ...state.measurements];
};
