import { I18n, I18nResolver } from 'i18n-ts';
import { en } from './en';
import { Language } from './Language';
import { sv } from './sv';
import { Translations } from './Translations';

/*
 * Translations will be initialized when booting the app.
 * To make it easier to use translations we fake to the
 * rest of the app that they are initialized.
 */
export const t: Translations = {} as Translations;

export const setLanguage = (language: Language) => {
  const i18n: I18n<typeof en> = {
    en: en,
    sv: sv,
    default: en,
  };

  const translations = new I18nResolver(i18n, language).translation;

  Object.assign(t, translations);
};
