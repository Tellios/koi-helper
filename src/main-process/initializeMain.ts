import { setLanguage } from '@shared/i18n';
import { logger } from '@shared/logger';
import { BrowserWindow } from 'electron';
import Stream from 'node:stream';
import winston from 'winston';
import { initializeModules } from './initializeModules';
import { IpcRegistry } from './ipc-actions';

export const initializeMain = (mainWindow: BrowserWindow) => {
  const stream = new Stream.PassThrough();
  stream.on('data', (chunk) => {
    const stringChunk = Buffer.from(chunk).toString('utf-8');
    mainWindow.webContents.send('log-message', stringChunk);
    console.log(stringChunk);
  });

  logger.configure({
    transports: [
      new winston.transports.Stream({
        stream,
      }),
    ],
  });

  process.on('uncaughtException', (err) => {
    logger.error(`Uncaught exception encountered: ${err}`);
    process.exit(1);
  });

  process.on('unhandledRejection', (err) => {
    logger.error(`Unhandled rejection encountered: ${err}`);
    process.exit(1);
  });

  logger.info('Initializing main process IOC modules');
  initializeModules();

  logger.info('Initializing main process IPC actions');
  IpcRegistry.initialize();

  setLanguage('en');
};
