import { t } from '@app/i18n';
import { ServiceLocator } from '@app/ioc';
import { logger } from '@app/logger';
import { AsyncAction, removeItem } from '@app/state';
import { Id, TransactionProvider, VarietyService } from '@app/storage';
import { ReferencedByEntityError } from '@app/storage/errors';
import { toast } from 'react-toastify';

export const deleteVariety: AsyncAction<Id> = async ({ state }, varietyId) => {
  state.appProgressOpen = true;
  state.appProgressMode = 'indeterminate';
  state.appProgressMessage = t.variety.deleteProgressMessage;

  try {
    await TransactionProvider.provide(async (entityManager) => {
      const varietyService = ServiceLocator.get(VarietyService);
      return await varietyService.delete(entityManager, varietyId);
    });

    state.varieties = removeItem(state.varieties, varietyId);
  } catch (error) {
    if (error instanceof ReferencedByEntityError) {
      toast.warn(error.message);
    } else if (error instanceof Error) {
      logger.error(error.message);
    } else {
      logger.error(`${error}`);
    }
  }

  state.appProgressOpen = false;
};
