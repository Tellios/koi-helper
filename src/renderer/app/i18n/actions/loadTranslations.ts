import { AsyncAction } from "app/state";
import { ServiceLocator } from "app/ioc";
import { TranslationService } from "../TranslationService";
import { t } from "../t";
import { Language } from "../langs";

export const loadTranslations: AsyncAction<Language> = async (
  { state },
  language: Language
) => {
  const translationService = ServiceLocator.get(TranslationService);

  const translations = await translationService.loadTranslations(language);
  Object.assign(t, translations);

  state.translationsLoaded = true;
};
