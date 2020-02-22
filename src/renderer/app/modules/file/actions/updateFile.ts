import { readFile } from "fs-extra";
import { AsyncAction } from "app/state";
import { Id, TransactionProvider, FileService } from "app/storage";
import { ServiceLocator } from "app/ioc";
import { selectFiles } from "app/utilities";
import { t } from "app/i18n";
import { fileFilters, updateFileFromDisk } from "../utils";

export interface IUpdateFileParams {
  fileId: Id;
}

export const updateFile: AsyncAction<IUpdateFileParams> = async (
  { state },
  { fileId }
) => {
  const result = await selectFiles({
    mode: "singleSelect",
    filters: fileFilters
  });

  if (result.filePaths?.length === 0) {
    return;
  }

  state.appProgressOpen = true;
  state.appProgressMessage = t.file.updateProgressMessage;
  state.appProgressMode = "indeterminate";

  const filename = result.filePaths[0];

  await TransactionProvider.provide(async entityManager => {
    const fileService = ServiceLocator.get(FileService);
    await updateFileFromDisk(entityManager, fileService, fileId, filename);
  });

  state.appProgressOpen = false;
};
