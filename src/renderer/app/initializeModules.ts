import { ModuleRegistry, ServiceLocator } from "./ioc";
import { Container } from "inversify";

export function initializeModules() {
  const container = new Container();
  const modules = ModuleRegistry.getModules();

  console.log(modules);

  for (const module of modules) {
    if (module.options) {
      if (module.options.services) {
        for (const service of module.options.services) {
          container.bind(service).toSelf();
        }
      }
    }
  }

  ServiceLocator.setContainerInstance(container);
}
