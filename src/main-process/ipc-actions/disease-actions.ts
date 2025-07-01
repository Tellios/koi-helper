import { Id, IDisease, IDiseaseBase } from '@shared/models';
import { ServiceLocator } from '../ioc';
import { DiseaseService, TransactionProvider } from '../storage';
import { ipcActionFactory } from './ipc-action-factory';

ipcActionFactory('disease:add', async (disease: IDiseaseBase): Promise<IDisease> => {
  return TransactionProvider.provide(async (entityManager) => {
    const diseaseService = ServiceLocator.get(DiseaseService);
    return await diseaseService.add(entityManager, disease);
  });
});

ipcActionFactory('disease:delete', async (diseaseId: Id): Promise<void> => {
  return await TransactionProvider.provide(async (entityManager) => {
    const diseaseService = ServiceLocator.get(DiseaseService);
    await diseaseService.delete(entityManager, diseaseId);
  });
});

ipcActionFactory('disease:getAll', async (): Promise<IDisease[]> => {
  return TransactionProvider.provide(async (entityManager) => {
    const diseaseService = ServiceLocator.get(DiseaseService);
    return await diseaseService.getAll(entityManager);
  });
});

ipcActionFactory('disease:update', async (disease: IDisease): Promise<IDisease> => {
  return TransactionProvider.provide(async (entityManager) => {
    const diseaseService = ServiceLocator.get(DiseaseService);
    return await diseaseService.update(entityManager, disease);
  });
});
