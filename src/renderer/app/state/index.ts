import {
  IConfig,
  Config,
  Action,
  IOnInitialize,
  IAction,
  IOperator,
  IDerive,
  IState
} from "overmind";
import { createHook } from "overmind-react";
import { State } from "./State";
import { addPond, updatePond, deletePond } from "../modules/pond";

export * from "./getConfig";

declare module "overmind" {
  interface Config
    extends IConfig<{
      state: State;
      actions: {
        addPond: typeof addPond;
        deletePond: typeof deletePond;
        updatePond: typeof updatePond;
      };
    }> {}
}

export interface OnInitialize extends IOnInitialize<Config> {}

export interface Action<Input = void, Output = void>
  extends IAction<Config, Input, Output> {}

export interface AsyncAction<Input = void, Output = void>
  extends IAction<Config, Input, Promise<Output>> {}

export interface Operator<Input = void, Output = Input>
  extends IOperator<Config, Input, Output> {}

export interface Derive<Parent extends IState, Output>
  extends IDerive<Config, Parent, Output> {}

export const useState = createHook<Config>();
