import { ServiceLocator } from '@main-process/ioc';
import { SettingsService } from '@main-process/storage';
import { IAppSettings } from '@shared/models';
import { ipcActionFactory } from './ipc-action-factory';

ipcActionFactory('settings:getAll', async () => {
  const settingsService = ServiceLocator.get(SettingsService);
  return await settingsService.getSettings();
});

ipcActionFactory('settings:update', async (partialSettings: Partial<IAppSettings>) => {
  const settingsService = ServiceLocator.get(SettingsService);
  await settingsService.saveSettings(partialSettings);
  return await settingsService.getSettings();
});
