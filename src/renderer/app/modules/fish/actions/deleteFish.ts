import { AsyncAction, removeItem } from "app/state";
import { TransactionProvider, IFish } from "app/storage";
import { ServiceLocator } from "app/ioc";
import { FishService } from "app/storage/FishService";

export const deleteFish: AsyncAction<IFish> = async (
  { state },
  fishToDelete
) => {
  await TransactionProvider.provide(async entityManager => {
    const fishService = ServiceLocator.get(FishService);
    return await fishService.delete(entityManager, fishToDelete);
  });

  state.fishes = removeItem(state.fishes, fishToDelete.id);
};
