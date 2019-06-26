import { Config } from "overmind";
import { ModuleRegistry } from "app/ioc";
import { Action, AsyncAction } from ".";
import { state } from "./State";

export function getConfig(): Config {
  const modules = ModuleRegistry.getModules();
  const actions: Record<string, Action<any> | AsyncAction<any>> = {};

  for (const module of modules) {
    if (module.options) {
      if (module.options.actions) {
        module.options.actions.reduce((acc, action) => {
          if (typeof acc[action.name] !== "undefined") {
            throw Error(`Action '${action.name}' already exist`);
          }

          acc[action.name] = action;
          return acc;
        }, actions);
      }
    }
  }

  return {
    state,
    actions: actions as any,
    effects: []
  };
}
