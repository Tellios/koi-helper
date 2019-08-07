import { AsyncAction } from "app/state";

export const loadApp: AsyncAction = async ({ state, actions }) => {
  state.appLoading = true;

  await actions.loadSettings();
  await actions.loadTranslations(state.settings.settings.language);

  if (state.settings.settings.lastLoadedFile) {
    await actions.loadFile(state.settings.settings.lastLoadedFile);
    document.title = state.settings.settings.lastLoadedFile;
  }

  state.appLoaded = true;
  state.appLoading = false;
};
