import { IPond, IVariety, IDisease, IFish, IMeasurement } from "app/storage";
import { IAppSettingsState } from "app/settings";
import { IMainBarOptions } from "app/ui";

export interface IAppState {
  appLoading: boolean;
  appLoaded: boolean;
  ponds: IPond[];
  fishes: IFish[];
  varieties: IVariety[];
  diseases: IDisease[];
  measurements: IMeasurement[];
  showArchivedPonds: boolean;
  settings: IAppSettingsState;
  activeFile: string | null;
  fileLoaded: boolean;
  failedToLoadFile: boolean;
  loadFileErrorMessage?: string;
  loadingFile: boolean;
  translationsLoaded: boolean;
  mainBarOptions: IMainBarOptions;
  appProgressOpen: boolean;
  appProgressMode: "indeterminate" | "count";
  appProgressTotalCount: number;
  appProgressCurrentCount: number;
  appProgressMessage: string;
  appProgressAction: { actionId: string; label: string; disabled?: boolean };
}

export const defaultState: IAppState = {
  appLoading: false,
  appLoaded: false,
  ponds: [],
  fishes: [],
  showArchivedPonds: false,
  varieties: [],
  diseases: [],
  measurements: [],
  settings: { loaded: false, showDialog: false, settings: { language: "en" } },
  activeFile: null,
  fileLoaded: false,
  failedToLoadFile: false,
  loadingFile: false,
  translationsLoaded: false,
  mainBarOptions: {
    title: "",
    actions: [],
    showBackButton: false
  },
  appProgressOpen: false,
  appProgressMode: "count",
  appProgressTotalCount: 0,
  appProgressCurrentCount: 0,
  appProgressMessage: "",
  appProgressAction: { actionId: "", label: "" }
};
