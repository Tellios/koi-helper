import { ServiceLocator } from '@main-process/ioc';
import { FishService, TransactionProvider } from '@main-process/storage';
import { IFish, IFishBase } from '@shared/models';
import { ipcActionFactory } from './ipc-action-factory';

ipcActionFactory('fish:add', async (fish: IFishBase): Promise<IFish> => {
  return TransactionProvider.provide(async (entityManager) => {
    const fishService = ServiceLocator.get(FishService);
    return await fishService.add(entityManager, fish, fish.pond);
  });
});

ipcActionFactory('fish:delete', async (fish: IFish): Promise<void> => {
  await TransactionProvider.provide(async (entityManager) => {
    const fishService = ServiceLocator.get(FishService);
    await fishService.delete(entityManager, fish);
  });
});

ipcActionFactory('fish:getByPondId', async (pondId: string): Promise<IFish[]> => {
  return TransactionProvider.provide(async (entityManager) => {
    const fishService = ServiceLocator.get(FishService);
    return await fishService.getPondFishes(entityManager, pondId);
  });
});

ipcActionFactory('fish:update', async (fish: IFish): Promise<IFish> => {
  return TransactionProvider.provide(async (entityManager) => {
    const fishService = ServiceLocator.get(FishService);
    return await fishService.update(entityManager, fish);
  });
});
