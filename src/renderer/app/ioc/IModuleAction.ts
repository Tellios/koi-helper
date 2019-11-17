import { Action, AsyncAction } from "app/state";

export interface IModuleAction {
  name: string;
  action: Action<any> | AsyncAction<any>;
}
