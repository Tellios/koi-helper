import {
  IConfig,
  Config,
  IOnInitialize,
  IAction,
  IOperator,
  IDerive,
  IState
} from "overmind";
import { createHook } from "overmind-react";
import { IAppState } from "./State";
import { IPondActions } from "app/modules/pond";
import { IUserStartupActions } from "app/modules/userStartup";
import { II18nActions } from "app/i18n";
import { ISettingsActions } from "app/settings";
import { IUIActions } from "app/ui";
import * as effects from "./effects";
import { IVarietyActions } from "app/modules/variety";
import { IDiseaseActions } from "app/modules/disease";
import { IFishActions } from "app/modules/fish";
import { IImageActions } from "app/modules/image";
import { IFileActions } from "app/modules/file";
import { IMeasurementActions } from "app/modules/measurement";

export * from "./getConfig";
export * from "./helpers";
export * from "./State";

declare module "overmind" {
  interface Config
    extends IConfig<{
      state: IAppState;
      actions: II18nActions &
        IPondActions &
        IFishActions &
        IVarietyActions &
        IDiseaseActions &
        IUserStartupActions &
        ISettingsActions &
        IUIActions &
        IImageActions &
        IFileActions &
        IMeasurementActions;
      effects: typeof effects;
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
