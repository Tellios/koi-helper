import { AsyncAction } from "app/state";
import { IVarietyBase, TransactionProvider, VarietyService } from "app/storage";
import { ServiceLocator } from "app/ioc";

export const addVariety: AsyncAction<IVarietyBase> = async (
  { state },
  variety
) => {
  const added = await TransactionProvider.provide(async entityManager => {
    const varietyService = ServiceLocator.get(VarietyService);
    return await varietyService.add(entityManager, variety);
  });

  state.varieties.push(added);
};
