import { Module } from "app/ioc";
import { loadFile } from "./actions";

export interface IUserStartupActions {
  loadFile: typeof loadFile;
}

@Module({
  actions: [loadFile]
})
export class UserStartupModule {}
