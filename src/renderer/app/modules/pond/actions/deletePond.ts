import { AsyncAction, removeItem } from "app/state";
import { TransactionProvider, PondService, IPond } from "app/storage";
import { ServiceLocator } from "app/ioc";

export const deletePond: AsyncAction<IPond> = async (
  { state },
  pondToDelete
) => {
  await TransactionProvider.provide(async entityManager => {
    const pondService = ServiceLocator.get(PondService);
    return await pondService.deletePond(entityManager, pondToDelete);
  });

  state.ponds = removeItem(state.ponds, pondToDelete.id);
};
