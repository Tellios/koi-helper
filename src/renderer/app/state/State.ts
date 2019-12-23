import { IPond, IVariety, IDisease, IFish, IMeasurement } from "app/storage";
import { IAppSettingsState } from "app/settings";
import { IMainBarOptions } from "app/ui";

export type State = {
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
  isUploadingImages: boolean;
  imagesUploaded: number;
  totalImagesToUpload: number;
};

export const state: State = {
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
  isUploadingImages: false,
  imagesUploaded: 0,
  totalImagesToUpload: 0
};
