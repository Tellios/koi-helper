import { AsyncAction, replaceItem } from "app/state";
import { TransactionProvider, IFish } from "app/storage";
import { ServiceLocator } from "app/ioc";
import { FishService } from "app/storage/FishService";

export const updateFish: AsyncAction<IFish> = async (
  { state },
  fishToUpdate
) => {
  const updatedFish = await TransactionProvider.provide(async entityManager => {
    const fishService = ServiceLocator.get(FishService);
    return await fishService.update(entityManager, fishToUpdate);
  });

  state.fishes = replaceItem(state.fishes, updatedFish);
};
