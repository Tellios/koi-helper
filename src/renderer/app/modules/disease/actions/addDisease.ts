import { AsyncAction } from "app/state";
import { TransactionProvider, IDiseaseBase, DiseaseService } from "app/storage";
import { ServiceLocator } from "app/ioc";

export const addDisease: AsyncAction<IDiseaseBase> = async (
  { state },
  disease
) => {
  const added = await TransactionProvider.provide(async entityManager => {
    const diseaseService = ServiceLocator.get(DiseaseService);
    return await diseaseService.add(entityManager, disease);
  });

  state.diseases.push(added);
};
