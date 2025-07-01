import { Id } from './Id';
import { PersistedModel } from './IPersistedModel';

export interface IMeasurementBase {
  date: Date;
  length: number;
  weight: number;
  comment: string;
}

export type IMeasurement = PersistedModel<IMeasurementBase>;

export interface IMeasurementAddParams {
  measurement: IMeasurementBase;
  fish: Id;
}
