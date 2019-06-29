import { Module } from "app/ioc";
import { loadSettings, loadFile } from "./actions";

export interface IUserStartupActions {
  loadSettings: typeof loadSettings;
  loadFile: typeof loadFile;
}

@Module({
  actions: [loadSettings, loadFile]
})
export class UserStartupModule {}
