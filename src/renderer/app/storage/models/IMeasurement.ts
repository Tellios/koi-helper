import { PersistedModel } from "./IPersistedModel";

export interface IMeasurementBase {
  date: Date;
  length: number;
  weight: number;
  comment: string;
}

export type IMeasurement = PersistedModel<IMeasurementBase>;
