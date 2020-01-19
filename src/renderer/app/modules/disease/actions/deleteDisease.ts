import { toast } from "react-toastify";
import { AsyncAction, removeItem } from "app/state";
import { TransactionProvider, Id, DiseaseService } from "app/storage";
import { ServiceLocator } from "app/ioc";
import { ReferencedByEntityError } from "app/storage/errors";
import { logger } from "app/logger";
import { t } from "app/i18n";

export const deleteDisease: AsyncAction<Id> = async ({ state }, diseaseId) => {
  state.appProgressOpen = true;
  state.appProgressMode = "indeterminate";
  state.appProgressMessage = t.disease.deleteProgressMessage;

  try {
    await TransactionProvider.provide(async entityManager => {
      const diseaseService = ServiceLocator.get(DiseaseService);
      return await diseaseService.delete(entityManager, diseaseId);
    });

    state.diseases = removeItem(state.diseases, diseaseId);
  } catch (error) {
    if (error instanceof ReferencedByEntityError) {
      toast.warn(error.message);
    } else {
      logger.error(error.message);
    }
  }

  state.appProgressOpen = false;
};
