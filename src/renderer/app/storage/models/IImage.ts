import { Id } from "app/storage";
import { PersistedModel } from "./IPersistedModel";

export interface IImageBase {
  isThumbnail: boolean;
  reference: Id;
  name: string;
  data: string;
}

export type IImage = PersistedModel<IImageBase>;

export type IImageReference = Omit<IImage, "data">;
