import { Id } from "app/storage";
import { IMeasurement } from "./IMeasurement";
import { ITreatment } from "./ITreatment";
import { PersistedModel } from "./IPersistedModel";
import { Sex } from "../Sex";

export interface IFishBase {
  born: Date;
  sex: Sex;
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
