import { AsyncAction } from "app/state";
import {
  TransactionProvider,
  MeasurementService,
  IMeasurementBase,
  Id
} from "app/storage";
import { ServiceLocator } from "app/ioc";

export interface IMeasurementAddParams {
  measurement: IMeasurementBase;
  fish: Id;
}

export const addMeasurement: AsyncAction<IMeasurementAddParams> = async (
  { state },
  { measurement, fish }
) => {
  const added = await TransactionProvider.provide(async entityManager => {
    const measurementService = ServiceLocator.get(MeasurementService);
    return await measurementService.add(entityManager, measurement, fish);
  });

  console.log("addMeasurement", added);

  state.measurements = [added, ...state.measurements];
};
