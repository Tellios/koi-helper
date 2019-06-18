import { Action } from "../../../state";
import { IPondBase } from "../../../repositories";

export const addPond: Action<IPondBase> = ({ state }, pondToAdd) => {
  state.ponds.push({ Id: state.ponds.length + 1, ...pondToAdd });
};
