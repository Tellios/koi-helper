import { Action } from "app/state";
import { IMainBarOptions } from "../IMainBarOptions";

export const setMainBar: Action<IMainBarOptions> = ({ state }, options) => {
  state.mainBarOptions = options;
};
