export type { Language, Translations } from './langs';
export * from './t';

import { loadTranslations } from './actions';

export interface II18nActions {
  loadTranslations: typeof loadTranslations;
}

export const i18nActions: II18nActions = {
  loadTranslations,
};
