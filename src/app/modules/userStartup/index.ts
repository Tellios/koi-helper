export * from './actions';
export * from './loadApp/LoadAppView';

import { loadApp, loadFile, newFile, openExistingFile } from './actions';

export interface IUserStartupActions {
  loadApp: typeof loadApp;
  loadFile: typeof loadFile;
  newFile: typeof newFile;
  openExistingFile: typeof openExistingFile;
}

export const userStartupActions: IUserStartupActions = {
  loadApp,
  loadFile,
  newFile,
  openExistingFile,
};
