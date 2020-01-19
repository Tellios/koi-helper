import { TransactionProvider, FileService, IFileReference } from "app/storage";
import { ServiceLocator } from "app/ioc";

export const getFileReferences = async (
  referenceId: string
): Promise<IFileReference[]> => {
  return await TransactionProvider.provide(async entityManager => {
    const fileService = ServiceLocator.get(FileService);
    return await fileService.getFileReferences(entityManager, referenceId);
  });
};
