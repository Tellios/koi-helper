import { PersistedModel } from "./IPersistedModel";

export interface IDiseaseBase {
  name: string;
  description: string;
  medication: string;
}

export type IDisease = PersistedModel<IDiseaseBase>;
