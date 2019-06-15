import { IModuleOptions } from "./IModuleOptions";

export interface IModule {
  target: Function;
  options?: IModuleOptions;
}
