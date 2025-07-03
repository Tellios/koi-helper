/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReferencedByEntityError } from '@main-process/storage';
import { IpcResponse } from '@shared/ipc-response';
import { ipcMain } from 'electron';
import { IpcAction } from './ipc-action.interface';

export class IpcRegistry {
  private static ipcActions: IpcAction<any, any>[] = [];

  public static registerAction(ipcAction: IpcAction<any, any>) {
    this.ipcActions.push(ipcAction);
  }

  public static initialize() {
    this.ipcActions.forEach((action) => {
      const { channel, handler } = action;

      ipcMain.handle(channel, async (_event, input: any): Promise<IpcResponse<any>> => {
        try {
          const response = await handler(input);
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
    });
  }
}
