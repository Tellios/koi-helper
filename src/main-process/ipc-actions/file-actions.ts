import { ServiceLocator } from '@main-process/ioc';
import { FileService, TransactionProvider } from '@main-process/storage';
import { Id, IFile, IFileBase, IFileReference } from '@shared/models';
import { spawn } from 'child_process';
import { readdirSync, readlinkSync, realpathSync } from 'fs';
import { ipcActionFactory } from './ipc-action-factory';
import { updateFileInDatabase } from './updateFileInDatabase';

const isFileOpenOnLinux = (realpath: string): boolean => {
  try {
    for (const pid of readdirSync('/proc')) {
      if (!/^\d+$/.test(pid)) continue;
      const fdDir = `/proc/${pid}/fd`;
      try {
        for (const fd of readdirSync(fdDir)) {
          try {
            if (readlinkSync(`${fdDir}/${fd}`) === realpath) return true;
          } catch (_e) {
            // fd may have been closed between readdir and readlink
          }
        }
      } catch (_e) {
        // process may have exited between readdir and reading its fds
      }
    }
  } catch (_e) {
    // /proc not available
  }
  return false;
};

const waitForLinuxFileClosed = (filepath: string): Promise<void> => {
  const realpath = realpathSync(filepath);
  return new Promise((resolve) => {
    let wasOpen = false;
    const poll = () => {
      const open = isFileOpenOnLinux(realpath);
      if (open) wasOpen = true;
      if (wasOpen && !open) resolve();
      else setTimeout(poll, 1000);
    };
    setTimeout(poll, 1500);
  });
};

ipcActionFactory('file:openExternal', async (filepath: string): Promise<void> => {
  await new Promise<void>((resolve, reject) => {
    if (process.platform === 'darwin') {
      const proc = spawn('open', ['-W', filepath]);
      proc.on('close', resolve);
      proc.on('error', reject);
    } else if (process.platform === 'win32') {
      const proc = spawn('cmd', ['/c', 'start', '/wait', '""', `"${filepath}"`]);
      proc.on('close', resolve);
      proc.on('error', reject);
    } else {
      const proc = spawn('xdg-open', [filepath]);
      proc.on('error', reject);
      waitForLinuxFileClosed(filepath).then(resolve).catch(reject);
    }
  });
});

ipcActionFactory('file:delete', async (fileId: Id): Promise<void> => {
  await TransactionProvider.provide(async (entityManager) => {
    const fileService = ServiceLocator.get(FileService);
    await fileService.delete(entityManager, fileId);
  });
});

ipcActionFactory('file:get', async (fileId: Id): Promise<IFile> => {
  return TransactionProvider.provide(async (entityManager) => {
    const fileService = ServiceLocator.get(FileService);
    return await fileService.getFile(entityManager, fileId);
  });
});

ipcActionFactory(
  'file:update',
  async (file: { fileId: Id; filename: string }): Promise<IFileReference> => {
    return TransactionProvider.provide(async (entityManager) => {
      const fileService = ServiceLocator.get(FileService);
      return updateFileInDatabase(entityManager, fileService, file.fileId, file.filename);
    });
  },
);

ipcActionFactory('file:add', async (file: IFileBase): Promise<IFileReference> => {
  return TransactionProvider.provide(async (entityManager) => {
    const fileService = ServiceLocator.get(FileService);
    return await fileService.add(entityManager, file);
  });
});

ipcActionFactory('file:getReferences', async (referenceId: Id): Promise<IFileReference[]> => {
  return TransactionProvider.provide(async (entityManager) => {
    const fileService = ServiceLocator.get(FileService);
    return await fileService.getFileReferences(entityManager, referenceId);
  });
});
