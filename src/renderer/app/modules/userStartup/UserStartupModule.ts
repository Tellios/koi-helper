import { Module } from "app/ioc";
import { loadSettings } from "./actions";

export interface IUserStartupActions {
  loadSettings: typeof loadSettings;
}

@Module({
  actions: [loadSettings]
})
export class UserStartupModule {}
