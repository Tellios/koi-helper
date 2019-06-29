import { IPond } from "app/storage";
import { IAppSettings } from "app/settings";

export type State = {
  ponds: IPond[];
  showArchivedPonds: boolean;
  settings: IAppSettings;
};

export const state: State = {
  ponds: [],
  showArchivedPonds: false,
  settings: { loaded: false }
};
