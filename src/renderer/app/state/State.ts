import { IPond } from "../repositories";

export type State = {
  ponds: IPond[];
};

export const state: State = {
  ponds: []
};
