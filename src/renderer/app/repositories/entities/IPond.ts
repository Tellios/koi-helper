import { Id } from "../../storage";

export interface IPondBase {
  Name: string;
  Length: number;
  Width: number;
  Depth: number;
  Liters: number;
}

export interface IPond extends IPondBase {
  Id: Id;
}
