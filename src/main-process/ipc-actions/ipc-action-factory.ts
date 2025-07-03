import { IpcAction } from './ipc-action.interface';
import { IpcRegistry } from './ipc-registry';

export const ipcActionFactory = <TInput, TResponse>(
  channel: string,
  cb: (input: TInput) => Promise<TResponse>,
) => {
  IpcRegistry.registerAction({
    channel,
    handler: cb,
  } satisfies IpcAction<TInput, TResponse>);
};
