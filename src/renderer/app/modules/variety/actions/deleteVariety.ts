import { AsyncAction, removeItem } from "app/state";
import { TransactionProvider, Id, VarietyService } from "app/storage";
import { ServiceLocator } from "app/ioc";

export const deleteVariety: AsyncAction<Id> = async ({ state }, varietyId) => {
  await TransactionProvider.provide(async entityManager => {
    const varietyService = ServiceLocator.get(VarietyService);
    return await varietyService.delete(entityManager, varietyId);
  });

  removeItem(state.varieties, varietyId);
};
