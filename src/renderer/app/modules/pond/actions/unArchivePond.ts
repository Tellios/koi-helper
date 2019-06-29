import { AsyncAction, replaceItem } from "app/state";
import { useTransaction, PondService, IPond } from "app/storage";
import { ServiceLocator } from "app/ioc";

export const unArchivePond: AsyncAction<IPond> = async (
  { state },
  pondToUnArchive
) => {
  const archivedPond = await useTransaction(async entityManager => {
    pondToUnArchive.archived = false;
    const service = ServiceLocator.get(PondService);
    return await service.updatePond(entityManager, pondToUnArchive);
  });

  state.ponds = replaceItem(state.ponds, archivedPond);
};
