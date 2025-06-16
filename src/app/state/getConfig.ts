import { ModuleRegistry } from '@app/ioc';
import { logger } from '@app/logger';
import { Action, AsyncAction } from '.';
import { Context } from './Context';
import { defaultState } from './State';
import * as effects from './effects';

export function getConfig(): Pick<Context, 'state' | 'actions' | 'effects'> {
  const modules = ModuleRegistry.getModules();
  const actions: Record<string, Action<unknown | void> | AsyncAction<unknown | void>> = {};

  for (const module of modules) {
    if (module.options.actions) {
      module.options.actions.reduce((acc, { name, action }) => {
        if (typeof acc[name] !== 'undefined') {
          throw Error(`Action '${name}' already exist`);
        }

        acc[name] = action;
        logger.verbose(`Loaded action: "${name}"`);
        return acc;
      }, actions);
    }
  }

  return {
    state: defaultState,
    actions: actions as unknown as Context['actions'],
    effects,
  };
}
