import { AsyncAction, replaceItem } from "app/state";
import { TransactionProvider, PondService, IPond } from "app/storage";
import { ServiceLocator } from "app/ioc";

export const archivePond: AsyncAction<IPond> = async (
  { state },
  pondToArchive
) => {
  const archivedPond = await TransactionProvider.provide(async entityManager => {
    pondToArchive.archived = true;
    const service = ServiceLocator.get(PondService);
    return await service.updatePond(entityManager, pondToArchive);
  });

  state.ponds = replaceItem(state.ponds, archivedPond);
};
