import { Id } from "../../storage";

export interface IPondTreatment {
  Id: Id;
  PondId: Id;
  Disease: string;
  Comment: string;
  Date: string;
  Finished: number;
}
