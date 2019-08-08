import { AsyncAction } from "app/state";
import { TransactionProvider, Id } from "app/storage";
import { ServiceLocator } from "app/ioc";
import { FishService } from "app/storage/FishService";

export const loadPondFishes: AsyncAction<Id> = async ({ state }, pondId) => {
  const fishes = await TransactionProvider.provide(async entityManager => {
    const fishService = ServiceLocator.get(FishService);
    return await fishService.getPondFishes(entityManager, pondId);
  });

  state.fishes = fishes;
};
