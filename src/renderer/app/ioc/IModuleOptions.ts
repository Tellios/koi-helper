import { interfaces } from "inversify";
import { IModuleAction } from "./IModuleAction";

export interface IModuleOptions {
  name: string;
  actions?: Array<IModuleAction>;
  services?: Array<interfaces.Newable<any> | interfaces.Abstract<any>>;
}
