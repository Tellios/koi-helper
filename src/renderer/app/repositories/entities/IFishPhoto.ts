import { Id } from "../../storage";

export interface IFishPhoto {
  PhotoId: Id;
  FishId: Id;
  PhotoName: string;
  Photo: string;
}
