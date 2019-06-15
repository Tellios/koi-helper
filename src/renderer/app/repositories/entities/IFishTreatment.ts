import { Id } from "../../storage";

export interface IFishTreatment {
  Id: Id;
  FishId: Id;
  Disease: string;
  Comment: string;
  Date: string;
  Finished: number;
}
