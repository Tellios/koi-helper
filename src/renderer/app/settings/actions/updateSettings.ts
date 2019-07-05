import { AsyncAction } from "app/state";
import { ServiceLocator } from "app/ioc";
import { SettingsService } from "../SettingsService";
import { IAppSettings } from "../IAppSettings";

export const updateSettings: AsyncAction<Partial<IAppSettings>> = async (
  { state, actions, effects },
  partialSettings: Partial<IAppSettings>
) => {
  const settingsService = ServiceLocator.get(SettingsService);

  await settingsService.saveSettings(partialSettings);
  const newSettings = await settingsService.getSettings();

  const hasLanguageChanged =
    newSettings.language !== state.settings.settings.language;

  state.settings.settings = newSettings;
  actions.loadTranslations(newSettings.language);
  actions.hideSettings();

  if (hasLanguageChanged) {
    effects.reloadApp();
  }
};
