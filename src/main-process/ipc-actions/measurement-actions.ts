import { ServiceLocator } from '@main-process/ioc';
import { MeasurementService, TransactionProvider } from '@main-process/storage';
import { IMeasurement, IMeasurementAddParams } from '@shared/models';
import { ipcActionFactory } from './ipc-action-factory';

ipcActionFactory(
  'measurement:add',
  async ({ measurement, fish }: IMeasurementAddParams): Promise<IMeasurement> => {
    return await TransactionProvider.provide(async (entityManager) => {
      const measurementService = ServiceLocator.get(MeasurementService);
      return await measurementService.add(entityManager, measurement, fish);
    });
  },
);

ipcActionFactory('measurement:delete', async (measurementId: string): Promise<void> => {
  await TransactionProvider.provide(async (entityManager) => {
    const measurementService = ServiceLocator.get(MeasurementService);
    await measurementService.delete(entityManager, measurementId);
  });
});

ipcActionFactory('measurement:getForFish', async (fishId: string): Promise<IMeasurement[]> => {
  return await TransactionProvider.provide(async (entityManager) => {
    const measurementService = ServiceLocator.get(MeasurementService);
    return await measurementService.getMeasurements(entityManager, fishId);
  });
});

ipcActionFactory('measurement:update', async (measurement: IMeasurement): Promise<IMeasurement> => {
  return await TransactionProvider.provide(async (entityManager) => {
    const measurementService = ServiceLocator.get(MeasurementService);
    return await measurementService.update(entityManager, measurement);
  });
});
