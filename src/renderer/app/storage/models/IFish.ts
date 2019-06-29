import { Id } from "app/storage";
import { IMeasurement } from "./IMeasurement";
import { ITreatment } from "./ITreatment";
import { PersistedModel } from "./IPersistedModel";

export interface IFishBase {
  born: string;
  sex: string;
  country: string;
  value: string;
  breeder: string;
  pond: Id;
  variety: Id;
  name: string;
  measurements: IMeasurement[];
  treatments: ITreatment[];
}

export type IFish = PersistedModel<IFishBase>;
