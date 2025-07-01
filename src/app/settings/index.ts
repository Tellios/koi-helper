export * from './actions';
export * from './IAppSettingsState';
export * from './settingsDialog/SettingsDialog';
export * from './ShowSettingsComponent';

import { hideSettings, loadSettings, showSettings, updateSettings } from './actions';

export interface ISettingsActions {
  updateSettings: typeof updateSettings;
  hideSettings: typeof hideSettings;
  showSettings: typeof showSettings;
  loadSettings: typeof loadSettings;
}

export const settingsActions: ISettingsActions = {
  updateSettings,
  hideSettings,
  showSettings,
  loadSettings,
};
