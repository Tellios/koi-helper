import { Translations } from "./langs";

/*
 * Translations will be initialized when booting the app.
 * To make it easier to use translations we fake to the
 * rest of the app that they are initialized.
 */
export const t: Translations = {} as any;
