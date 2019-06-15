import { Id } from "../../storage";

export interface IPondTreatmentComment {
  Id: Id;
  ObjectId: Id;
  Date: string;
  Comment: string;
  Category: string;
  OwnerId: string;
}
