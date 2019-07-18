import { AsyncAction, removeItem } from "app/state";
import { TransactionProvider, Id, VarietyService } from "app/storage";
import { ServiceLocator } from "app/ioc";
import { ReferencedByFishError } from "app/storage/errors";
import { logger } from "app/logger";
import { toast } from "react-toastify";

export const deleteVariety: AsyncAction<Id> = async ({ state }, varietyId) => {
  try {
    await TransactionProvider.provide(async entityManager => {
      const varietyService = ServiceLocator.get(VarietyService);
      return await varietyService.delete(entityManager, varietyId);
    });

    state.varieties = removeItem(state.varieties, varietyId);
  } catch (error) {
    if (error instanceof ReferencedByFishError) {
      toast.warn(error.message);
    } else {
      logger.error(error.message);
    }
  }
};
