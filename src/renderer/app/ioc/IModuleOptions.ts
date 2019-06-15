import { interfaces } from "inversify";
export interface IModuleOptions {
    services?: Array<interfaces.Newable<any> | interfaces.Abstract<any>>;
}
