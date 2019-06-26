import { AsyncAction } from "app/state";
import { IPond } from "app/repositories";
import { useDbContext } from "app/storage";

export const updatePond: AsyncAction<IPond> = async (
  { state },
  pondToUpdate
) => {
  await useDbContext(({ context, pondRepository }) =>
    pondRepository.update(context, pondToUpdate)
  );

  for (let i = 0; i < state.ponds.length; i++) {
    if (state.ponds[i].Id === pondToUpdate.Id) {
      state.ponds[i] = pondToUpdate;
      return;
    }
  }
};
