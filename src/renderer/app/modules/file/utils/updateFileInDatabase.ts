import { readFile } from "fs-extra";
import { EntityManager } from "typeorm";
import { FileService, Id } from "app/storage";
import { logger } from "app/logger";

export const updateFileInDatabase = async (
  entityManager: EntityManager,
  fileService: FileService,
  fileId: Id,
  filename: string
) => {
  logger.debug(`Reading file: ${filename}`);
  const fileBuffer = await readFile(filename);

  logger.debug(`Updating file in db: ${fileId}`);
  const updatedFile = await fileService.update(
    entityManager,
    fileId,
    fileBuffer.toString("base64")
  );

  logger.debug("File update finished");
  return updatedFile;
};
