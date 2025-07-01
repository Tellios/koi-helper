export * from './components';

import { deleteFile, editFile, saveFile, updateFile, uploadFiles } from './actions';

export interface IFileActions {
  deleteFile: typeof deleteFile;
  editFile: typeof editFile;
  saveFile: typeof saveFile;
  updateFile: typeof updateFile;
  uploadFiles: typeof uploadFiles;
}

export const fileActions: IFileActions = {
  deleteFile,
  editFile,
  saveFile,
  updateFile,
  uploadFiles,
};
