import { AsyncAction, replaceItem } from "app/state";
import {
  IMeasurement,
  TransactionProvider,
  MeasurementService
} from "app/storage";
import { ServiceLocator } from "app/ioc";

export const updateMeasurement: AsyncAction<IMeasurement> = async (
  { state },
  measurement
) => {
  const updated = await TransactionProvider.provide(async entityManager => {
    const measurementService = ServiceLocator.get(MeasurementService);
    return await measurementService.update(entityManager, measurement);
  });

  state.measurements = replaceItem(state.measurements, updated);
};
