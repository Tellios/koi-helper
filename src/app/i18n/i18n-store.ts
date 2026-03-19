import { I18n, I18nResolver } from 'i18n-ts';
import { create } from 'zustand';
import { en, Language, sv } from './langs';
import { logger } from '@shared/logger';
import { t } from './t';

export interface II18nState {
  translationsLoaded: boolean;
  loadTranslations: (language: Language) => Promise<void>;
}

export const useI18nStore = create<II18nState>((set) => ({
  translationsLoaded: false,
  loadTranslations: async (language: Language) => {
    logger.verbose(`Loading translation files`);

    const i18n: I18n<typeof en> = {
      en: en,
      sv: sv,
      default: en,
    };

    const translations = new I18nResolver(i18n, language).translation;

    Object.assign(t, translations);

    set((state) => ({ ...state, translationsLoaded: true }));
    logger.verbose(`Translation files loaded`);
  },
}));
