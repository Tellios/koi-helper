import { AsyncAction } from "app/state";
import { toast } from "react-toastify";

export const loadApp: AsyncAction = async ({ state, actions }) => {
  state.appLoading = true;

  await actions.loadSettings();
  await actions.loadTranslations(state.settings.settings.language);

  if (state.settings.settings.lastLoadedFile) {
    await actions.loadFile(state.settings.settings.lastLoadedFile);
  }

  toast.success("App loaded");

  state.appLoaded = true;
  state.appLoading = false;
};
