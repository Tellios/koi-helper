import { Module } from "app/ioc";
import { loadFile, loadApp, newFile, openFile } from "./actions";

export interface IUserStartupActions {
  loadApp: typeof loadApp;
  loadFile: typeof loadFile;
  newFile: typeof newFile;
  openFile: typeof openFile;
}

@Module({
  actions: [loadApp, loadFile, newFile, openFile]
})
export class UserStartupModule {}
