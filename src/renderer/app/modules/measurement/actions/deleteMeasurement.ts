import { AsyncAction, removeItem } from "app/state";
import { TransactionProvider, MeasurementService, Id } from "app/storage";
import { ServiceLocator } from "app/ioc";

export const deleteMeasurement: AsyncAction<Id> = async (
  { state },
  measurementId
) => {
  await TransactionProvider.provide(async entityManager => {
    const measurementService = ServiceLocator.get(MeasurementService);
    return await measurementService.delete(entityManager, measurementId);
  });

  state.measurements = removeItem(state.measurements, measurementId);
};
