import { ModuleRegistry, ServiceLocator } from './ioc';
import { Container } from 'inversify';
import { logger } from './logger';

export function initializeModules() {
  const container = new Container();
  const modules = ModuleRegistry.getModules();

  for (const module of modules) {
    if (module.options.services) {
      for (const service of module.options.services) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((service as any).__isSingleInstance) {
          container.bind(service).toSelf().inSingletonScope();
          continue;
        }

        container.bind(service).toSelf();
      }
    }

    logger.verbose(`Loaded module: "${module.options.name}"`);
  }

  ServiceLocator.setContainerInstance(container);
}
