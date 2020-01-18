import { readFile } from "fs-extra";
import { AsyncAction } from "app/state";
import { Id, TransactionProvider, FileService } from "app/storage";
import { ServiceLocator } from "app/ioc";
import { selectFiles } from "app/utilities";
import { fileFilters } from "../utilities";

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

  state.isUploadingFiles = true;
  state.filesUploaded = 0;
  state.totalFilesToUpload = 1;

  const filename = result.filePaths[0];

  await TransactionProvider.provide(async entityManager => {
    const fileService = ServiceLocator.get(FileService);

    const fileBuffer = await readFile(filename);

    const updatedFile = await fileService.update(
      entityManager,
      fileId,
      fileBuffer.toString("base64")
    );

    state.filesUploaded = state.filesUploaded + 1;

    return updatedFile;
  });

  state.isUploadingFiles = false;
};
