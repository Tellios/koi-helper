import { IModuleOptions } from './IModuleOptions';
import { ModuleRegistry } from './ModuleRegistry';

export function Module(options: IModuleOptions): ClassDecorator {
  return (target) => {
    ModuleRegistry.registerModule(target, options);
  };
}
