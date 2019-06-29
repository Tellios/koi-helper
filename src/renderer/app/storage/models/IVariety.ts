import { PersistedModel } from "./IPersistedModel";

export interface IVarietyBase {
  name: string;
  description: string;
}

export type IVariety = PersistedModel<IVarietyBase>;
