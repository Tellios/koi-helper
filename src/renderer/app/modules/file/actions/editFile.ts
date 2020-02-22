import { remote } from "electron";
import tempy from "tempy";
import { writeFile, watch } from "fs-extra";
import { debounce } from "lodash";
import { AsyncAction } from "app/state";
import { Id, TransactionProvider, FileService } from "app/storage";
import { ServiceLocator } from "app/ioc";
import { t } from "app/i18n";
import { logger } from "app/logger";
import { updateFileFromDisk } from "../utils";

export interface IEditFileParams {
  fileId: Id;
}

export const editFile: AsyncAction<IEditFileParams> = async (
  { state },
  { fileId }
) => {
  const fileService = ServiceLocator.get(FileService);

  state.appProgressOpen = true;
  state.appProgressMessage = t.file.prepareEditProgressMessage;
  state.appProgressMode = "indeterminate";

  const file = await TransactionProvider.provide(async entityManager => {
    return await fileService.getFile(entityManager, fileId);
  });

  const extensionName = file.extension.substring(1);
  const tempFilename = tempy.file({ extension: extensionName });

  logger.verbose(`Creating temp file: ${tempFilename}`);
  const buffer = Buffer.from(file.data, "base64");
  await writeFile(tempFilename, buffer);

  logger.verbose("Temp file created, starting watcher on file");
  state.appProgressMessage = t.file.editFileInProgress;

  if (remote.shell.openItem(tempFilename)) {
    await new Promise((resolve, reject) => {
      const watcher = watch(
        tempFilename,
        debounce((event, filename) => {
          logger.verbose(
            `WatchTrigger: ${event} : ${filename ?? "no filename"}`
          );

          if (filename && event === "change") {
            logger.verbose(
              "Change detected, updating stored file with changes"
            );
            state.appProgressMessage = t.file.updateProgressMessage;

            TransactionProvider.provide(async entityManager => {
              updateFileFromDisk(
                entityManager,
                fileService,
                fileId,
                tempFilename
              )
                .catch(() => {
                  watcher.close();
                  reject();
                })
                .then(() => {
                  state.appProgressMessage = t.file.editFileInProgress;
                });
            });
          }
        }, 1000)
      );
    });
  }

  state.appProgressOpen = false;
};
