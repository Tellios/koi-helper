import { AsyncAction } from "app/state";
import { useTransaction, PondService } from "app/storage";
import { ServiceLocator } from "app/ioc";

export const getPonds: AsyncAction = async ({ state }) => {
  state.ponds = await useTransaction(async entityManager => {
    const service = ServiceLocator.get(PondService);
    return await service.getPonds(entityManager);
  });
};
