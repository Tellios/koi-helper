import { IPond } from "app/storage";
import { IAppSettingsState } from "app/settings";

export type State = {
  ponds: IPond[];
  showArchivedPonds: boolean;
  settings: IAppSettingsState;
  activeFile: string | null;
  fileLoaded: boolean;
  loadingFile: boolean;
  translationsLoaded: boolean;
};

export const state: State = {
  ponds: [],
  showArchivedPonds: false,
  settings: { loaded: false, showDialog: false, settings: { language: "en" } },
  activeFile: null,
  fileLoaded: false,
  loadingFile: false,
  translationsLoaded: false
};
