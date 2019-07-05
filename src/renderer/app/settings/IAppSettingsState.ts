import { IAppSettings } from "./IAppSettings";

export interface IAppSettingsState {
  settings: IAppSettings;
  loaded: boolean;
  showDialog: boolean;
}
