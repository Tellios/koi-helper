import { Id } from "../../storage";

export interface IPondPhoto {
  PhotoId: Id;
  PondId: Id;
  PhotoName: string;
  Photo: string;
}
