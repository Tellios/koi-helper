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
import { IPondActions } from "app/modules/pond";
import { IUserStartupActions } from "app/modules/userStartup";

export * from "./getConfig";

declare module "overmind" {
  interface Config
    extends IConfig<{
      state: State;
      actions: IPondActions & IUserStartupActions;
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

export const useAppState = createHook<Config>();
