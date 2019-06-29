import { Id } from "../Id";

export interface IPersistedModel {
  id: Id;
  created: Date;
  updated: Date;
}

export type PersistedModel<T> = IPersistedModel & T;
