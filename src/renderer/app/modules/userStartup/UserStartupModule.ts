import { Module } from "app/ioc";
import { loadFile, loadApp, newFile } from "./actions";

export interface IUserStartupActions {
  loadApp: typeof loadApp;
  loadFile: typeof loadFile;
  newFile: typeof newFile;
}

@Module({
  actions: [loadApp, loadFile, newFile]
})
export class UserStartupModule {}
