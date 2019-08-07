import { AsyncAction, replaceItem } from "app/state";
import { IDisease, TransactionProvider, DiseaseService } from "app/storage";
import { ServiceLocator } from "app/ioc";

export const updateDisease: AsyncAction<IDisease> = async (
  { state },
  variety
) => {
  const updated = await TransactionProvider.provide(async entityManager => {
    const diseaseService = ServiceLocator.get(DiseaseService);
    return await diseaseService.update(entityManager, variety);
  });

  state.diseases = replaceItem(state.diseases, updated);
};
