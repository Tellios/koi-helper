import { IAction, IContext } from 'overmind';
import { II18nActions } from '../i18n';
import { IDiseaseActions } from '../modules/disease';
import { IFileActions } from '../modules/file';
import { IFishActions } from '../modules/fish';
import { IImageActions } from '../modules/image';
import { IMeasurementActions } from '../modules/measurement';
import { IPondActions } from '../modules/pond';
import { IUserStartupActions } from '../modules/userStartup';
import { IVarietyActions } from '../modules/variety';
import { ISettingsActions } from '../settings';
import { IMainMenuActions, IUIActions } from '../ui';
import * as effects from './effects';
import { IAppState } from './State';

export interface Action<Input = void, Output = void> extends IAction<Input, Output> {}

export interface AsyncAction<Input = void, Output = void> extends IAction<Input, Promise<Output>> {}

export type Context = IContext<{
  state: IAppState;
  actions: II18nActions &
    IPondActions &
    IFishActions &
    IVarietyActions &
    IDiseaseActions &
    IUserStartupActions &
    ISettingsActions &
    IUIActions &
    IMainMenuActions &
    IImageActions &
    IFileActions &
    IMeasurementActions;
  effects: typeof effects;
}>;
