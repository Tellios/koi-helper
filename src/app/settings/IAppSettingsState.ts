import { IAppSettings } from '@shared/models';

export interface IAppSettingsState {
  settings: IAppSettings;
  loaded: boolean;
  showDialog: boolean;
}
