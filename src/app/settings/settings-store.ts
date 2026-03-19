import { create } from 'zustand';
import { IAppSettings } from '@shared/models';
import { invokeIpcAction } from '@app/utilities';
import { logger } from '@shared/logger';
import { useI18nStore } from '@app/i18n';

export interface IAppSettingsState {
  settings: IAppSettings;
  loaded: boolean;
  showDialog: boolean;
  hideSettings: () => void;
  showSettings: () => void;
  updateSettings: (partialSettings: Partial<IAppSettings>) => Promise<void>;
  loadSettings: () => Promise<void>;
}

export const useSettingsStore = create<IAppSettingsState>((set, get) => {
  return {
    showDialog: false,
    loaded: false,
    settings: {
      language: 'en',
      lastLoadedFile: undefined,
    },
    hideSettings: () => {
      set((state) => ({ ...state, showDialog: false }));
    },
    showSettings: () => {
      set((state) => ({ ...state, showDialog: true }));
    },
    updateSettings: async (partialSettings: Partial<IAppSettings>) => {
      const response = await invokeIpcAction<Partial<IAppSettings>, IAppSettings>(
        'settings:update',
        partialSettings,
      );

      if (response.errorCode) {
        return;
      }

      const newSettings = response.data;
      const settingsState = get().settings;
      const hasLanguageChanged = newSettings.language !== settingsState.language;

      set((state) => ({
        ...state,
        settings: newSettings,
      }));

      useI18nStore.getState().loadTranslations(newSettings.language);
      get().hideSettings();

      if (hasLanguageChanged) {
        location.reload();
      }
    },
    loadSettings: async () => {
      logger.verbose(`Loading settings`);
      const response = await invokeIpcAction<void, IAppSettings>('settings:getAll', undefined);

      if (response.errorCode) {
        logger.verbose(
          `Failed to load translation files: ${response.errorCode}, ${response.message}`,
        );
        logger.verbose(`Using default settings instead`);
        set((state) => ({
          ...state,
          settings: {
            language: 'en',
            lastLoadedFile: undefined,
          },
          loaded: true,
          showDialog: false,
        }));
        return;
      }

      logger.verbose(`Settings loaded: ${JSON.stringify(response.data, null, 2)}`);

      set((state) => ({
        ...state,
        settings: response.data,
        loaded: true,
        showDialog: false,
      }));
    },
  };
});
