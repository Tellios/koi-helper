import { AsyncAction } from "app/state";
import { TransactionProvider, VarietyService } from "app/storage";
import { ServiceLocator } from "app/ioc";

export const loadVarieties: AsyncAction = async ({ state }) => {
    const varieties = await TransactionProvider.provide(async entityManager => {
        const varietyService = ServiceLocator.get(VarietyService);
        return await varietyService.getAll(entityManager);
      });
    
    state.varieties = varieties;
};
