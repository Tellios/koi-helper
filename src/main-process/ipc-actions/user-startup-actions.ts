import { ServiceLocator } from '@main-process/ioc';
import { ConnectionService } from '@main-process/storage';
import { Language, setLanguage } from '@shared/i18n';
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

ipcActionFactory('userStartup:setLanguage', async (language: Language) => {
  setLanguage(language);
});
