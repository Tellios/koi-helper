import { AsyncAction } from "app/state";
import { TransactionProvider, DiseaseService } from "app/storage";
import { ServiceLocator } from "app/ioc";

export const loadDiseases: AsyncAction = async ({ state }) => {
  const diseases = await TransactionProvider.provide(async entityManager => {
    const diseaseService = ServiceLocator.get(DiseaseService);
    return await diseaseService.getAll(entityManager);
  });

  state.diseases = diseases;
};
