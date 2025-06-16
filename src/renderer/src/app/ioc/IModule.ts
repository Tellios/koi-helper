import { IModuleOptions } from './IModuleOptions';

export interface IModule {
  target: NewableFunction;
  options: IModuleOptions;
}
