import { ServiceLocator } from '@main-process/ioc';
import { FileService, TransactionProvider } from '@main-process/storage';
import { Id, IFile, IFileBase, IFileReference } from '@shared/models';
import { ipcActionFactory } from './ipc-action-factory';
import { updateFileInDatabase } from './updateFileInDatabase';

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
