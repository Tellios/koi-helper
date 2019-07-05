import { Module } from "app/ioc";
import { loadTranslations } from "./actions";
import { TranslationService } from "./TranslationService";

export interface II18nActions {
  loadTranslations: typeof loadTranslations;
}

@Module({
  actions: [loadTranslations],
  services: [TranslationService]
})
export class TranslationModule {}
