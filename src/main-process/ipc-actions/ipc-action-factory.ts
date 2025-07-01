import { ReferencedByEntityError } from '@main-process/storage';
import { IpcResponse } from '@shared/ipc-response';
import { ipcMain } from 'electron';

export const ipcActionFactory = <TInput, TResponse>(
  channel: string,
  cb: (input: TInput) => Promise<TResponse>,
) => {
  ipcMain.handle(channel, async (_event, input: TInput): Promise<IpcResponse<TResponse>> => {
    try {
      const response = await cb(input);
      return {
        data: response,
      };
    } catch (error) {
      if (error instanceof ReferencedByEntityError) {
        return {
          errorCode: 'REFERENCED_BY_ENTITY',
          message: error.message,
        };
      } else if (error instanceof Error) {
        return {
          errorCode: 'UNKNOWN_ERROR',
          message: error.message,
        };
      } else {
        return {
          errorCode: 'UNKNOWN_ERROR',
          message: String(error),
        };
      }
    }
  });
};
