import { removeItem, replaceItem } from '@app/state';
import { invokeIpcAction } from '@app/utilities';
import { Id, IMeasurement, IMeasurementBase } from '@shared/models';
import { create } from 'zustand';

export interface IMeasurementState {
  measurements: IMeasurement[];
  addMeasurement: (measurement: IMeasurementBase) => Promise<void>;
  deleteMeasurement: (measurementId: Id) => Promise<void>;
  getMeasurements: (fishId: Id) => Promise<void>;
  updateMeasurement: (measurement: IMeasurement) => Promise<void>;
}

export const useMeasurementStore = create<IMeasurementState>((set) => {
  return {
    measurements: [],
    addMeasurement: async (measurement: IMeasurementBase) => {
      const response = await invokeIpcAction<IMeasurementBase, IMeasurement>(
        'measurement:add',
        measurement,
      );

      if (response.errorCode) {
        return;
      }

      set((state) => ({ ...state, measurements: [...state.measurements, response.data] }));
    },
    deleteMeasurement: async (measurementId: Id) => {
      const response = await invokeIpcAction<Id, void>('measurement:delete', measurementId);

      if (response.errorCode) {
        return;
      }

      set((state) => ({
        ...state,
        measurements: removeItem(state.measurements, measurementId),
      }));
    },
    getMeasurements: async (fishId: Id) => {
      set((state) => ({ ...state, measurements: [] }));

      const response = await invokeIpcAction<Id, IMeasurement[]>('measurement:getForFish', fishId);

      if (response.errorCode) {
        return;
      }

      set((state) => ({ ...state, measurements: response.data }));
    },
    updateMeasurement: async (measurement: IMeasurement) => {
      const response = await invokeIpcAction<IMeasurement, IMeasurement>(
        'measurement:update',
        measurement,
      );

      if (response.errorCode) {
        return;
      }

      set((state) => ({
        ...state,
        measurements: replaceItem(state.measurements, response.data),
      }));
    },
  };
});
