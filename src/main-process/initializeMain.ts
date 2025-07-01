import { logger } from '@shared/logger';
import { BrowserWindow } from 'electron';
import Stream from 'node:stream';
import winston from 'winston';
import { initializeModules } from './initializeModules';

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

  logger.info('Initializing main process IOC modules');
  initializeModules();
};
