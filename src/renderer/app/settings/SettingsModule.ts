import { Module } from "app/ioc";
import { SettingsService } from "./SettingsService";
import {
  updateSettings,
  hideSettings,
  showSettings,
  loadSettings
} from "./actions";

export interface ISettingsActions {
  updateSettings: typeof updateSettings;
  hideSettings: typeof hideSettings;
  showSettings: typeof showSettings;
  loadSettings: typeof loadSettings;
}

@Module({
  actions: [updateSettings, hideSettings, showSettings, loadSettings],
  services: [SettingsService]
})
export class SettingsModule {}
