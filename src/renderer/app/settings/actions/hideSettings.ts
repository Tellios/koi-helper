import { Action } from "app/state";

export const hideSettings: Action = ({ state }) => {
  state.settings.showDialog = false;
};
