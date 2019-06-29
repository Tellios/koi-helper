import { AsyncAction } from "app/state";

export const loadSettings: AsyncAction = async ({ state }) => {
  await Promise.resolve();
  state.settings = {
    lastLoadedFile: "/home/sonny/test-sqlite-v2.db",
    loaded: true
  };
};
