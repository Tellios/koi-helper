import { AsyncAction } from "app/state";
import { TransactionProvider, MeasurementService, Id } from "app/storage";
import { ServiceLocator } from "app/ioc";

export const getMeasurements: AsyncAction<Id> = async ({ state }, fishId) => {
  state.measurements = [];

  const measurements = await TransactionProvider.provide(
    async entityManager => {
      const measurementService = ServiceLocator.get(MeasurementService);
      return await measurementService.getMeasurements(entityManager, fishId);
    }
  );

  state.measurements = measurements;
};
