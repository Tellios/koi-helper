import { Config } from "overmind";
import { ModuleRegistry } from "app/ioc";
import { Action, AsyncAction } from ".";
import { state } from "./State";
import * as effects from "./effects";
import { logger } from "app/logger";

export function getConfig(): Config {
  const modules = ModuleRegistry.getModules();
  const actions: Record<string, Action<any> | AsyncAction<any>> = {};

  for (const module of modules) {
    if (module.options.actions) {
      module.options.actions.reduce((acc, { name, action }) => {
        if (typeof acc[name] !== "undefined") {
          throw Error(`Action '${name}' already exist`);
        }

        acc[name] = action;
        logger.verbose(`Loaded action: "${name}"`);
        return acc;
      }, actions);
    }
  }

  return {
    state,
    actions: actions as any,
    effects
  };
}
