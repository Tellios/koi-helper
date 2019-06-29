import { Action } from "app/state";

export const toggleShowArchivedPonds: Action = ({ state }) => {
  state.showArchivedPonds = !state.showArchivedPonds;
};
