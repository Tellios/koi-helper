import { Action } from "../../../state";
import { IPond } from "../../../repositories";

export const deletePond: Action<IPond> = ({ state }, pondToDelete) => {
  state.ponds = state.ponds.filter(pond => pond.Id !== pondToDelete.Id);
};
