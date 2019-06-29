import { ITreatment } from "./ITreatment";
import { PersistedModel } from "./IPersistedModel";

export interface IPondBase {
  name: string;
  length: number;
  width: number;
  depth: number;
  volume: number;
  archived: boolean;
  treatments: ITreatment[];
}

export type IPond = PersistedModel<IPondBase>;
