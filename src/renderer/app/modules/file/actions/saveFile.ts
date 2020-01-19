import { remote } from "electron";
import { writeFile } from "fs-extra";
import { AsyncAction } from "app/state";
import { Id, TransactionProvider, FileService } from "app/storage";
import { ServiceLocator } from "app/ioc";
import { fileFilters } from "../utils";

export interface ISaveFileParams {
  fileId: Id;
}

export const saveFile: AsyncAction<ISaveFileParams> = async (
  {},
  { fileId }
) => {
  const fileService = ServiceLocator.get(FileService);

  await TransactionProvider.provide(async entityManager => {
    const file = await fileService.getFile(entityManager, fileId);
    const extensionName = file.extension.substring(1);

    const result = await remote.dialog.showSaveDialog({
      defaultPath: file.name + file.extension,
      filters: [{ name: extensionName, extensions: [extensionName] }]
    });

    if (
      result.canceled ||
      result.filePath === undefined ||
      result.filePath.length === 0
    ) {
      return;
    }

    let filename = result.filePath;

    if (!filename.endsWith(file.extension)) {
      filename += file.extension;
    }

    const buffer = Buffer.from(file.data, "base64");
    await writeFile(filename, buffer);
  });
};
