import { ServiceLocator } from '@main-process/ioc';
import { ConnectionService } from '@main-process/storage';
import { ipcActionFactory } from './ipc-action-factory';

ipcActionFactory('userStartup:loadFile', async (filename: string) => {
  const connectionService = ServiceLocator.get(ConnectionService);
  await connectionService.openFile(filename);
});

ipcActionFactory('userStartup:newFile', async (filename: string) => {
  const connectionService = ServiceLocator.get(ConnectionService);
  await connectionService.newFile(filename);
});

ipcActionFactory('userStartup:openFile', async (filename: string) => {
  const connectionService = ServiceLocator.get(ConnectionService);
  await connectionService.openFile(filename);
});
