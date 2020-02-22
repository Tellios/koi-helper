import { remote } from "electron";
import { watch } from "chokidar";
import tempy from "tempy";
import { writeFile } from "fs-extra";
import { AsyncAction, IAppState } from "app/state";
import { Id, TransactionProvider, FileService } from "app/storage";
import { ServiceLocator } from "app/ioc";
import { t } from "app/i18n";
import { logger } from "app/logger";
import { appProgressDialogActionEmitter } from "app/ui";
import { updateFileInDatabase } from "../utils";
import { toast } from "react-toastify";

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
    try {
      await monitorFile(state, tempFilename, fileService, fileId);
    } catch (error) {
      logger.error(`Monitoring of file failed: ${error}`);
    }
  } else {
    toast.error(t.file.errors.editOpenFailed);
  }

  state.appProgressOpen = false;
};

const monitorFile = async (
  state: IAppState,
  tempFilename: string,
  fileService: FileService,
  fileId: Id
) => {
  const performUpdate = (): Promise<void> => {
    logger.verbose("Change detected, updating stored file with changes");
    state.appProgressMessage = t.file.updateProgressMessage;
    setProgressAction(state, true);

    return TransactionProvider.provide(async entityManager => {
      updateFileInDatabase(entityManager, fileService, fileId, tempFilename);
    });
  };

  await new Promise((resolve, reject) => {
    let updatePromise: Promise<void> | null = null;

    const watcher = watch(tempFilename, { usePolling: true });

    setProgressAction(state, false);
    const unbind = appProgressDialogActionEmitter.onAction("editDone", () => {
      watcher.close();
      unbind();
      unsetProgressAction(state);
      resolve();
    });

    watcher.on("change", () => {
      logger.verbose(`Change detected by chokidar`);

      if (updatePromise === null) {
        logger.debug(`No file update in progress, starting update of file`);
        updatePromise = performUpdate()
          .catch(error => {
            watcher.close();
            unbind();
            unsetProgressAction(state);
            toast(t.file.errors.updateFailed);
            reject(error);
          })
          .then(() => {
            state.appProgressMessage = t.file.editFileInProgress;
            setProgressAction(state, false);
          })
          .finally(() => {
            updatePromise = null;
          });
      } else {
        logger.debug(`File update already in progress, update ignored`);
      }
    });
  });
};

const setProgressAction = (state: IAppState, disabled: boolean) => {
  state.appProgressAction = {
    actionId: "editDone",
    label: t.file.editFileProgressAction,
    disabled
  };
};

const unsetProgressAction = (state: IAppState) => {
  state.appProgressAction = { actionId: "", label: "" };
};
