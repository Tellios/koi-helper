import { invokeIpcAction } from '@app/utilities';
import { Language, setLanguage } from '@shared/i18n';
import { logger } from '@shared/logger';
import { create } from 'zustand';

export interface II18nState {
  translationsLoaded: boolean;
  loadTranslations: (language: Language) => Promise<void>;
}

export const useI18nStore = create<II18nState>((set) => ({
  translationsLoaded: false,
  loadTranslations: async (language: Language) => {
    logger.verbose(`Loading translation files`);

    setLanguage(language);
    await invokeIpcAction('userStartup:setLanguage', language);

    set((state) => ({ ...state, translationsLoaded: true }));
    logger.verbose(`Translation files loaded`);
  },
}));
