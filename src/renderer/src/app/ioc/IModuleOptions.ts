import { Newable } from 'inversify';
import { IModuleAction } from './IModuleAction';

export interface IModuleOptions {
  name: string;
  actions?: Array<IModuleAction>;
  services?: Array<Newable>;
}
