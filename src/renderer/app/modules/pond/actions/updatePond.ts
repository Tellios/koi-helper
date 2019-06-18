import { Action } from "../../../state";
import { IPond } from "../../../repositories";

export const updatePond: Action<IPond> = ({ state }, pondToUpdate) => {
  for (let i = 0; i < state.ponds.length; i++) {
    if (state.ponds[i].Id === pondToUpdate.Id) {
      state.ponds[i] = pondToUpdate;
      return;
    }
  }
};
