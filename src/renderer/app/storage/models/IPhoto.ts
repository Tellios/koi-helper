import { Id } from "app/storage";
import { PersistedModel } from "./IPersistedModel";

export interface IPhotoBase {
  reference: Id;
  photoName: string;
  photo: Blob;
}

export type IPhoto = PersistedModel<IPhotoBase>;
