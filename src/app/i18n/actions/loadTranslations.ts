import { AsyncAction } from '@app/state';
import { logger } from '@shared/logger';
import { I18n, I18nResolver } from 'i18n-ts';
import { en, Language, sv } from '../langs';
import { t } from '../t';

export const loadTranslations: AsyncAction<Language> = async ({ state }, language: Language) => {
  logger.verbose(`Loading translation files`);

  const i18n: I18n<typeof en> = {
    en: en,
    sv: sv,
    default: en,
  };

  const translations = new I18nResolver(i18n, language).translation;

  Object.assign(t, translations);

  state.translationsLoaded = true;
};
