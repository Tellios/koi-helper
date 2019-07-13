import { Module } from "app/ioc";
import { loadFile, loadApp } from "./actions";

export interface IUserStartupActions {
  loadApp: typeof loadApp;
  loadFile: typeof loadFile;
}

@Module({
  actions: [loadApp, loadFile]
})
export class UserStartupModule {}
