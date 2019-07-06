import { AsyncAction, replaceItem } from "app/state";
import { IVariety, TransactionProvider, VarietyService } from "app/storage";
import { ServiceLocator } from "app/ioc";

export const updateVariety: AsyncAction<IVariety> = async (
  { state },
  variety
) => {
  const updated = await TransactionProvider.provide(async entityManager => {
    const varietyService = ServiceLocator.get(VarietyService);
    return await varietyService.update(entityManager, variety);
  });

  replaceItem(state.varieties, updated);
};
