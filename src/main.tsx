import 'normalize.css/normalize.css';
import './index.css';
import 'typeface-roboto/index.css';
import 'reflect-metadata';
import './app/bootstrap';
import { ipcRenderer } from 'electron';

ipcRenderer.on('log-message', (_event, arg: string) => {
  console.log(arg);
});
