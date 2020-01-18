import { Id } from "app/storage";
import { PersistedModel } from "./IPersistedModel";

export interface IFileBase {
  reference: Id;
  name: string;
  extension: string;
  data: string;
}

export type IFile = PersistedModel<IFileBase>;

export type IFileReference = Omit<IFile, "data">;
