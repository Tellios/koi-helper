import { TransactionProvider, FileService, IFileReference } from "app/storage";
import { ServiceLocator } from "app/ioc";

export const getFileReferences = async (
  referenceId: string
): Promise<IFileReference[]> => {
  return await TransactionProvider.provide(async entityManager => {
    const fileService = ServiceLocator.get(FileService);
    const references = await fileService.getFileReferences(
      entityManager,
      referenceId
    );

    return references.sort((a, b) => {
      const aTime = a.created.getTime();
      const bTime = b.created.getTime();

      if (aTime > bTime) {
        return 1;
      } else if (aTime < bTime) {
        return -1;
      } else {
        return 0;
      }
    });
  });
};
