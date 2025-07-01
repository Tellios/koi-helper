import { ServiceLocator } from '@main-process/ioc';
import { TransactionProvider, VarietyService } from '@main-process/storage';
import { IVariety, IVarietyBase } from '@shared/models';
import { ipcActionFactory } from './ipc-action-factory';

ipcActionFactory('variety:add', async (variety: IVarietyBase): Promise<IVariety> => {
  return await TransactionProvider.provide(async (entityManager) => {
    const varietyService = ServiceLocator.get(VarietyService);
    return await varietyService.add(entityManager, variety);
  });
});

ipcActionFactory('variety:delete', async (varietyId: string): Promise<void> => {
  await TransactionProvider.provide(async (entityManager) => {
    const varietyService = ServiceLocator.get(VarietyService);
    await varietyService.delete(entityManager, varietyId);
  });
});

ipcActionFactory('variety:getAll', async (): Promise<IVariety[]> => {
  return await TransactionProvider.provide(async (entityManager) => {
    const varietyService = ServiceLocator.get(VarietyService);
    return await varietyService.getAll(entityManager);
  });
});

ipcActionFactory('variety:update', async (variety: IVariety): Promise<IVariety> => {
  return await TransactionProvider.provide(async (entityManager) => {
    const varietyService = ServiceLocator.get(VarietyService);
    return await varietyService.update(entityManager, variety);
  });
});
