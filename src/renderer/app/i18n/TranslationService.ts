import { injectable } from "inversify";
import { I18nResolver, I18n } from "i18n-ts";
import { en } from "./langs/en";
import { sv } from "./langs/sv";
import { SingleInstance } from "app/ioc";
import { Translations, Language } from "./langs";

@injectable()
@SingleInstance()
export class TranslationService {
  public async loadTranslations(language: Language): Promise<Translations> {
    const i18n: I18n<typeof en> = {
      en: en,
      sv: sv,
      default: en
    };

    const translations = new I18nResolver(i18n, language).translation;

    return translations;
  }
}
