import { AsyncAction, removeItem } from "app/state";
import { TransactionProvider, PondService, IPond } from "app/storage";
import { ServiceLocator } from "app/ioc";
import { t } from "app/i18n";

export const deletePond: AsyncAction<IPond> = async (
  { state },
  pondToDelete
) => {
  state.appProgressOpen = true;
  state.appProgressMode = "indeterminate";
  state.appProgressMessage = t.pond.deleteProgressMessage;

  await TransactionProvider.provide(async entityManager => {
    const pondService = ServiceLocator.get(PondService);
    return await pondService.deletePond(entityManager, pondToDelete);
  });

  state.ponds = removeItem(state.ponds, pondToDelete.id);
  state.appProgressOpen = false;
};
