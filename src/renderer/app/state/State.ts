import { IPond } from "app/repositories";

export type State = {
  ponds: IPond[];
};

export const state: State = {
  ponds: []
};
