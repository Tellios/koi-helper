import { interfaces } from "inversify";
import { Action, AsyncAction } from "app/state";
export interface IModuleOptions {
  actions?: Array<Action<any> | AsyncAction<any>>;
  services?: Array<interfaces.Newable<any> | interfaces.Abstract<any>>;
}
