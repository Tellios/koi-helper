export * from './list/MeasurementListHeaderView';
export * from './list/MeasurementListView';
export * from './list/MeasurementsGraphView';

import { addMeasurement, deleteMeasurement, getMeasurements, updateMeasurement } from './actions';

export interface IMeasurementActions {
  addMeasurement: typeof addMeasurement;
  deleteMeasurement: typeof deleteMeasurement;
  updateMeasurement: typeof updateMeasurement;
  getMeasurements: typeof getMeasurements;
}

export const measurementActions: IMeasurementActions = {
  addMeasurement,
  deleteMeasurement,
  updateMeasurement,
  getMeasurements,
};
