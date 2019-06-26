import { IPond } from "app/repositories";
import { IAppSettings } from "app/settings";

export type State = {
  ponds: IPond[];
  settings: IAppSettings;
};

export const state: State = {
  ponds: [],
  settings: { loaded: false }
};
