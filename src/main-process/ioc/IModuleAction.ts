import { Action, AsyncAction } from '@app/state';

export interface IModuleAction {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: Action<any, any> | AsyncAction<any, any>;
}
