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
  name: "settings",
  actions: [
    { name: "updateSettings", action: updateSettings },
    { name: "hideSettings", action: hideSettings },
    { name: "showSettings", action: showSettings },
    { name: "loadSettings", action: loadSettings }
  ],
  services: [SettingsService]
})
export class SettingsModule {}
