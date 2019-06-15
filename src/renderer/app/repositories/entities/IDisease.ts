import { Id } from "../../storage";

export interface IDisease {
  Id: Id;
  Name: string;
  Description: string;
  Medication: string;
}
