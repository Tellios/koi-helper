import { t } from '@app/i18n';
import { appProgressDialogActionEmitter, useAppProgressStore } from '@app/ui';
import { invokeIpcAction, selectFiles } from '@app/utilities';
import { dialog, shell } from '@electron/remote';
import { logger } from '@shared/logger';
import { Id, IFile, IFileBase, IFileReference } from '@shared/models';
import { watch } from 'chokidar';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { toast } from 'react-toastify';
import { temporaryFile } from 'tempy';
import { create } from 'zustand';
import { fileFilters } from './utils';

export interface IFileState {
  deleteFile(params: { fileId: Id }): Promise<void>;
  editFile(params: { fileId: Id }): Promise<void>;
  saveFile(params: { fileId: Id }): Promise<void>;
  updateFile(params: { fileId: Id }): Promise<void>;
  uploadFiles(params: { referenceId: Id }): Promise<void>;
}

export const useFileStore = create<IFileState>(() => {
  return {
    deleteFile: async ({ fileId }) => {
      try {
        useAppProgressStore.getState().showProgress({
          message: t.file.deleteProgressMessage,
          mode: 'indeterminate',
        });

        await invokeIpcAction('file:delete', fileId);
      } finally {
        useAppProgressStore.getState().hideProgress();
      }
    },
    editFile: async ({ fileId }) => {
      try {
        useAppProgressStore.getState().showProgress({
          message: t.file.prepareEditProgressMessage,
          mode: 'indeterminate',
        });

        const response = await invokeIpcAction<Id, IFile>('file:get', fileId);

        if (response.errorCode) {
          logger.error(`Failed to get file: ${response.message}`);
          useAppProgressStore.getState().hideProgress();
          toast.error(t.file.errors.editOpenFailed);
          return;
        }

        const file = response.data;

        const extensionName = file.extension.substring(1);
        const tempFilename = temporaryFile({ extension: extensionName });

        logger.verbose(`Creating temp file: ${tempFilename}`);
        const buffer = Buffer.from(file.data, 'base64');
        await writeFile(tempFilename, buffer);

        logger.verbose('Temp file created, starting watcher on file');
        useAppProgressStore.getState().showProgress({
          message: t.file.editFileInProgress,
          mode: 'indeterminate',
        });

        const errorMessage = await shell.openPath(tempFilename);

        if (!errorMessage) {
          try {
            await monitorFile(tempFilename, fileId);
          } catch (error) {
            logger.error(`Monitoring of file failed: ${error}`);
          }
        } else {
          toast.error(t.file.errors.editOpenFailed);
        }
      } finally {
        useAppProgressStore.getState().hideProgress();
      }
    },
    saveFile: async ({ fileId }) => {
      try {
        useAppProgressStore.getState().showProgress({
          message: t.file.updateProgressMessage,
          mode: 'indeterminate',
        });

        const getResponse = await invokeIpcAction<Id, IFile>('file:get', fileId);

        if (getResponse.errorCode) {
          useAppProgressStore.getState().hideProgress();
          logger.error(`Failed to get file: ${getResponse.message}`);
          return;
        }

        const file = getResponse.data;

        const extensionName = file.extension.substring(1);

        const result = await dialog.showSaveDialog({
          defaultPath: file.name + file.extension,
          filters: [{ name: extensionName, extensions: [extensionName] }],
        });

        if (result.canceled || result.filePath === undefined || result.filePath.length === 0) {
          return;
        }

        let filename = result.filePath;

        if (!filename.endsWith(file.extension)) {
          filename += file.extension;
        }

        const buffer = Buffer.from(file.data, 'base64');
        await writeFile(filename, buffer);
      } finally {
        useAppProgressStore.getState().hideProgress();
      }
    },
    updateFile: async ({ fileId }) => {
      const result = await selectFiles({
        mode: 'singleSelect',
        filters: fileFilters,
      });

      if (result.filePaths?.length === 0) {
        return;
      }

      try {
        useAppProgressStore.getState().showProgress({
          message: t.file.updateProgressMessage,
          mode: 'indeterminate',
        });

        const filename = result.filePaths[0];

        await invokeIpcAction('file:update', { fileId, filename });
      } finally {
        useAppProgressStore.getState().hideProgress();
      }
    },
    uploadFiles: async ({ referenceId }) => {
      const result = await selectFiles({
        mode: 'multiSelect',
        filters: fileFilters,
      });

      if (result.filePaths?.length === 0) {
        return;
      }

      try {
        useAppProgressStore.getState().showProgress({
          message: t.file.uploadProgressMessage,
          mode: 'count',
          totalCount: result.filePaths.length,
          currentCount: 0,
        });

        await Promise.all(
          result.filePaths.map(async (filename) => {
            const { name, ext } = path.parse(filename);

            const fileBuffer = await readFile(filename);

            const addedFile = await invokeIpcAction<IFileBase, IFileReference>('file:add', {
              name,
              extension: ext,
              reference: referenceId,
              data: fileBuffer.toString('base64'),
            });

            useAppProgressStore.getState().showProgress({
              currentCount: useAppProgressStore.getState().currentCount + 1,
            });

            return addedFile;
          }),
        );
      } finally {
        useAppProgressStore.getState().hideProgress();
      }
    },
  };
});

const monitorFile = async (tempFilename: string, fileId: Id) => {
  const performUpdate = async (): Promise<void> => {
    logger.verbose('Change detected, updating stored file with changes');
    useAppProgressStore.getState().showProgress({
      message: t.file.updateProgressMessage,
      mode: 'indeterminate',
    });

    useAppProgressStore.getState().setProgressAction({
      actionId: 'editDone',
      label: t.file.editFileProgressAction,
      disabled: true,
    });

    await invokeIpcAction('file:update', { fileId, filename: tempFilename });
  };

  await new Promise<void>((resolve, reject) => {
    let updatePromise: Promise<void> | null = null;

    const watcher = watch(tempFilename, { usePolling: true });

    useAppProgressStore.getState().setProgressAction({
      actionId: 'editDone',
      label: t.file.editFileProgressAction,
      disabled: false,
    });

    const unbind = appProgressDialogActionEmitter.onAction('editDone', () => {
      watcher.close();
      unbind();
      useAppProgressStore.getState().setProgressAction({
        actionId: '',
        label: '',
        disabled: true,
      });
      resolve();
    });

    watcher.on('change', () => {
      logger.verbose(`Change detected by chokidar`);

      if (updatePromise === null) {
        logger.debug(`No file update in progress, starting update of file`);
        updatePromise = performUpdate()
          .catch((error) => {
            watcher.close();
            unbind();
            useAppProgressStore.getState().setProgressAction({
              actionId: '',
              label: '',
              disabled: true,
            });
            toast(t.file.errors.updateFailed);
            reject(error);
          })
          .then(() => {
            useAppProgressStore.getState().showProgress({
              message: t.file.editFileInProgress,
              mode: 'indeterminate',
            });

            useAppProgressStore.getState().setProgressAction({
              actionId: 'editDone',
              label: t.file.editFileProgressAction,
              disabled: false,
            });
          })
          .finally(() => {
            updatePromise = null;
          });
      } else {
        logger.debug(`File update already in progress, update ignored`);
      }
    });
  });
};
