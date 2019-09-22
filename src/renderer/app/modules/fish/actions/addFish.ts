import { AsyncAction } from "app/state";
import { IFishBase, TransactionProvider } from "app/storage";
import { ServiceLocator } from "app/ioc";
import { FishService } from "app/storage/FishService";

export const addFish: AsyncAction<IFishBase> = async ({ state }, fishToAdd) => {
  const addedFish = await TransactionProvider.provide(async entityManager => {
    const fishService = ServiceLocator.get(FishService);
    return await fishService.add(entityManager, fishToAdd, fishToAdd.pond);
  });

  state.fishes.push(addedFish);
};
