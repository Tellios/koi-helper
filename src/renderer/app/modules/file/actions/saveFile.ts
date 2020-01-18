import { remote } from "electron";
import { AsyncAction } from "app/state";
import { Id, TransactionProvider, FileService } from "app/storage";
import { ServiceLocator } from "app/ioc";

export interface ISaveFileParams {
  fileId: Id;
}

export const saveFile: AsyncAction<ISaveFileParams> = async (
  {},
  { fileId }
) => {
  await TransactionProvider.provide(async entityManager => {
    const fileService = ServiceLocator.get(FileService);

    const file = await fileService.getFile(entityManager, fileId);

    const result = await remote.dialog.showSaveDialog({
      filters: fileFilters
    });
  });
};
