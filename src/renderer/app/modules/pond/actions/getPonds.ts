import { AsyncAction } from "app/state";
import { TransactionProvider, PondService } from "app/storage";
import { ServiceLocator } from "app/ioc";

export const getPonds: AsyncAction = async ({ state }) => {
  state.ponds = await TransactionProvider.provide(async entityManager => {
    const service = ServiceLocator.get(PondService);
    return await service.getPonds(entityManager);
  });
};
