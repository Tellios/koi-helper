import * as path from "path";
import { readFile } from "fs-extra";
import { AsyncAction } from "app/state";
import { Id, TransactionProvider, FileService } from "app/storage";
import { ServiceLocator } from "app/ioc";
import { selectFiles } from "app/utilities";
import { fileFilters } from "../utilities";

export interface IUploadFilesParams {
  referenceId: Id;
}

export const uploadFiles: AsyncAction<IUploadFilesParams> = async (
  { state },
  { referenceId }
) => {
  const result = await selectFiles({
    mode: "multiSelect",
    filters: fileFilters
  });

  if (result.filePaths?.length === 0) {
    return;
  }

  state.isUploadingFiles = true;
  state.filesUploaded = 0;
  state.totalFilesToUpload = result.filePaths.length;

  await TransactionProvider.provide(async entityManager => {
    const fileService = ServiceLocator.get(FileService);

    return await Promise.all(
      result.filePaths.map(async filename => {
        const { name, ext } = path.parse(filename);

        const fileBuffer = await readFile(filename);

        const addedFile = await fileService.add(entityManager, {
          name,
          extension: ext,
          reference: referenceId,
          data: fileBuffer.toString("base64")
        });

        state.filesUploaded = state.filesUploaded + 1;

        return addedFile;
      })
    );
  });

  state.isUploadingFiles = false;
};
