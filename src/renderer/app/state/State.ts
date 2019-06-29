import { IPond } from "app/storage";
import { IAppSettings } from "app/settings";

export type State = {
  ponds: IPond[];
  showArchivedPonds: boolean;
  settings: IAppSettings;
  activeFile: string | null;
  fileLoaded: boolean;
  loadingFile: boolean;
};

export const state: State = {
  ponds: [],
  showArchivedPonds: false,
  settings: { loaded: false },
  activeFile: null,
  fileLoaded: false,
  loadingFile: false
};
