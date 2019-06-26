import { AsyncAction } from "app/state";
import { IPond } from "app/repositories";
import { useDbContext } from "app/storage";

export const deletePond: AsyncAction<IPond> = async (
  { state },
  pondToDelete
) => {
  await useDbContext(({ context, pondRepository }) =>
    pondRepository.delete(context, pondToDelete)
  );

  state.ponds = state.ponds.filter(pond => pond.Id !== pondToDelete.Id);
};
