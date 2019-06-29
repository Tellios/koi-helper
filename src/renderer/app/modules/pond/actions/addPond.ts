import { AsyncAction } from "app/state";
import { TransactionProvider, PondService, IPondBase } from "app/storage";
import { ServiceLocator } from "app/ioc";

export const addPond: AsyncAction<IPondBase> = async ({ state }, pondToAdd) => {
  const addedPond = await TransactionProvider.provide(async entityManager => {
    const pondService = ServiceLocator.get(PondService);
    return await pondService.addPond(entityManager, pondToAdd);
  });

  state.ponds.push(addedPond);
};
