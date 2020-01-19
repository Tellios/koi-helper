import { toast } from "react-toastify";
import { AsyncAction, removeItem } from "app/state";
import { TransactionProvider, Id, VarietyService } from "app/storage";
import { ServiceLocator } from "app/ioc";
import { ReferencedByEntityError } from "app/storage/errors";
import { logger } from "app/logger";
import { t } from "app/i18n";

export const deleteVariety: AsyncAction<Id> = async ({ state }, varietyId) => {
  state.appProgressOpen = true;
  state.appProgressMode = "indeterminate";
  state.appProgressMessage = t.variety.deleteProgressMessage;

  try {
    await TransactionProvider.provide(async entityManager => {
      const varietyService = ServiceLocator.get(VarietyService);
      return await varietyService.delete(entityManager, varietyId);
    });

    state.varieties = removeItem(state.varieties, varietyId);
  } catch (error) {
    if (error instanceof ReferencedByEntityError) {
      toast.warn(error.message);
    } else {
      logger.error(error.message);
    }
  }

  state.appProgressOpen = false;
};
