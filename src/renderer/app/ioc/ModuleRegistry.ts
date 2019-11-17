import { IModule } from "./IModule";
import { IModuleOptions } from "./IModuleOptions";

export class ModuleRegistry {
  private static modules: IModule[] = [];

  public static registerModule(target: Function, options: IModuleOptions) {
    this.modules.push({
      target,
      options
    });
  }

  public static getModules() {
    return this.modules;
  }
}
