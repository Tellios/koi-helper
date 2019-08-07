import { IPond, IVariety, IDisease } from "app/storage";
import { IAppSettingsState } from "app/settings";
import { IMainBarOptions } from "app/ui";

export type State = {
  appLoading: boolean;
  appLoaded: boolean;
  ponds: IPond[];
  varieties: IVariety[];
  diseases: IDisease[];
  showArchivedPonds: boolean;
  settings: IAppSettingsState;
  activeFile: string | null;
  fileLoaded: boolean;
  loadingFile: boolean;
  translationsLoaded: boolean;
  mainBarOptions: IMainBarOptions;
};

export const state: State = {
  appLoading: false,
  appLoaded: false,
  ponds: [],
  showArchivedPonds: false,
  varieties: [],
  diseases: [],
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
