import { ServiceLocator } from '@main-process/ioc';
import { PondService, TransactionProvider } from '@main-process/storage';
import { IPond, IPondBase } from '@shared/models';
import { ipcActionFactory } from './ipc-action-factory';

ipcActionFactory('pond:add', async (pondToAdd: IPondBase) => {
  return await TransactionProvider.provide(async (entityManager) => {
    const pondService = ServiceLocator.get(PondService);
    return await pondService.addPond(entityManager, pondToAdd);
  });
});

ipcActionFactory('pond:archive', async (pondToArchive: IPond) => {
  return await TransactionProvider.provide(async (entityManager) => {
    pondToArchive.archived = true;
    const pondService = ServiceLocator.get(PondService);
    return await pondService.updatePond(entityManager, pondToArchive);
  });
});

ipcActionFactory('pond:unArchive', async (pondToArchive: IPond) => {
  return await TransactionProvider.provide(async (entityManager) => {
    pondToArchive.archived = false;
    const pondService = ServiceLocator.get(PondService);
    return await pondService.updatePond(entityManager, pondToArchive);
  });
});

ipcActionFactory('pond:delete', async (pond: IPond) => {
  await TransactionProvider.provide(async (entityManager) => {
    const pondService = ServiceLocator.get(PondService);
    await pondService.deletePond(entityManager, pond);
  });
});

ipcActionFactory('pond:getAll', async (): Promise<IPond[]> => {
  return await TransactionProvider.provide(async (entityManager) => {
    const pondService = ServiceLocator.get(PondService);
    return await pondService.getPonds(entityManager);
  });
});

ipcActionFactory('pond:update', async (pondToUpdate: IPond) => {
  return await TransactionProvider.provide(async (entityManager) => {
    const pondService = ServiceLocator.get(PondService);
    return await pondService.updatePond(entityManager, pondToUpdate);
  });
});
