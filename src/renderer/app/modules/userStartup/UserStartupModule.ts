import { Module } from "app/ioc";
import { loadFile, loadApp, newFile, openExistingFile } from "./actions";

export interface IUserStartupActions {
  loadApp: typeof loadApp;
  loadFile: typeof loadFile;
  newFile: typeof newFile;
  openExistingFile: typeof openExistingFile;
}

@Module({
  name: "userStartup",
  actions: [
    { name: "loadApp", action: loadApp },
    { name: "loadFile", action: loadFile },
    { name: "newFile", action: newFile },
    { name: "openExistingFile", action: openExistingFile }
  ]
})
export class UserStartupModule {}
