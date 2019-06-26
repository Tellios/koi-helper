import { AsyncAction } from "app/state";
import { IPondBase } from "app/repositories";
import { useDbContext } from "app/storage";

export const addPond: AsyncAction<IPondBase> = async ({ state }, pondToAdd) => {
  const addedPond = await useDbContext(({ context, pondRepository }) =>
    pondRepository.insert(context, pondToAdd)
  );

  state.ponds.push(addedPond);
};
