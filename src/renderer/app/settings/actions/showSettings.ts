import { Action } from "app/state";

export const showSettings: Action = ({ state }) => {
  state.settings.showDialog = true;
};
