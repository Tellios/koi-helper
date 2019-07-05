import { AsyncAction } from "app/state";
import { ServiceLocator } from "app/ioc";
import { SettingsService } from "../SettingsService";

export const loadSettings: AsyncAction = async ({ state }) => {
  const settingsService = ServiceLocator.get(SettingsService);
  const loadedSettings = await settingsService.getSettings();

  state.settings = {
    settings: {
      ...loadedSettings,
      lastLoadedFile: "/home/sonny/test-sqlite-v2.db"
    },
    loaded: true,
    showDialog: false
  };
};
