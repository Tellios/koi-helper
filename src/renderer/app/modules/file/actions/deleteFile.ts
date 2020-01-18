import { AsyncAction } from "app/state";
import { Id, TransactionProvider, FileService } from "app/storage";
import { ServiceLocator } from "app/ioc";

export interface IDeleteFileParams {
  fileId: Id;
}

export const deleteFile: AsyncAction<IDeleteFileParams> = async (
  {},
  { fileId }
) => {
  await TransactionProvider.provide(async entityManager => {
    const fileService = ServiceLocator.get(FileService);
    fileService.delete(entityManager, fileId);
  });
};
