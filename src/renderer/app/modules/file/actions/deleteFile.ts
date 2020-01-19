import { AsyncAction } from "app/state";
import { Id, TransactionProvider, FileService } from "app/storage";
import { ServiceLocator } from "app/ioc";
import { t } from "app/i18n";

export interface IDeleteFileParams {
  fileId: Id;
}

export const deleteFile: AsyncAction<IDeleteFileParams> = async (
  { state },
  { fileId }
) => {
  state.appProgressOpen = true;
  state.appProgressMode = "indeterminate";
  state.appProgressMessage = t.file.deleteProgressMessage;

  await TransactionProvider.provide(async entityManager => {
    const fileService = ServiceLocator.get(FileService);
    fileService.delete(entityManager, fileId);
  });

  state.appProgressOpen = false;
};
