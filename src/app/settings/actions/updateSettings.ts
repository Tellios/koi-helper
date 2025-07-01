import { AsyncAction } from '@app/state';
import { invokeIpcAction } from '@app/utilities';
import { IAppSettings } from '@shared/models';

export const updateSettings: AsyncAction<Partial<IAppSettings>> = async (
  { state, actions, effects },
  partialSettings: Partial<IAppSettings>,
) => {
  const response = await invokeIpcAction<Partial<IAppSettings>, IAppSettings>(
    'settings:update',
    partialSettings,
  );

  if (response.errorCode) {
    return;
  }

  const newSettings = response.data;
  const hasLanguageChanged = newSettings.language !== state.settings.settings.language;

  state.settings.settings = newSettings;
  actions.loadTranslations(newSettings.language);
  actions.hideSettings();

  if (hasLanguageChanged) {
    effects.reloadApp();
  }
};
