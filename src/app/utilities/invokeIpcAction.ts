import { IpcResponse } from '@shared/ipc-response';
import { logger } from '@shared/logger';
import { ipcRenderer } from 'electron';

export const invokeIpcAction = async <TInput, TOutput>(
  channel: string,
  input: TInput,
): Promise<IpcResponse<TOutput>> => {
  try {
    const response = await ipcRenderer.invoke(channel, input);

    if (response.errorCode) {
      logger.error(`IPC Error: ${response.errorCode} - ${response.message}`);
    }

    return response;
  } catch (error) {
    if (error instanceof Error) {
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
};
