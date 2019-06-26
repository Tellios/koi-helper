import { AsyncAction } from "app/state";
import { useDbContext } from "app/storage";

export const getPonds: AsyncAction = async ({ state }) => {
  state.ponds = await useDbContext(({ context, pondRepository }) =>
    pondRepository.getAll(context)
  );
};
