import { Newable } from 'inversify';

export interface IModuleOptions {
  name: string;
  services?: Array<Newable>;
}
