import { interfaces } from "inversify";
import { Action } from "overmind";
export interface IModuleOptions {
  actions?: Array<Action<any>>;
  services?: Array<interfaces.Newable<any> | interfaces.Abstract<any>>;
}
