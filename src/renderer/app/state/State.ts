import { IPond, IVariety } from "app/storage";
import { IAppSettingsState } from "app/settings";
import { IMainBarOptions } from "app/ui";

export type State = {
  ponds: IPond[];
  varieties: IVariety[];
  showArchivedPonds: boolean;
  settings: IAppSettingsState;
  activeFile: string | null;
  fileLoaded: boolean;
  loadingFile: boolean;
  translationsLoaded: boolean;
  mainBarOptions: IMainBarOptions;
};

export const state: State = {
  ponds: [],
  showArchivedPonds: false,
  varieties: [],
  settings: { loaded: false, showDialog: false, settings: { language: "en" } },
  activeFile: null,
  fileLoaded: false,
  loadingFile: false,
  translationsLoaded: false,
  mainBarOptions: {
    title: "",
    actions: [],
    showBackButton: false
  }
};
