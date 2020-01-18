import { injectable } from "inversify";
import { EntityManager } from "typeorm";
import { LogFunction } from "app/logger";
import { Id } from "./Id";
import { FileEntity } from "./orm";
import { IFile, IFileReference, IFileBase } from "./models";

@injectable()
export class FileService {
  @LogFunction()
  public async getFileReferences(
    entityManager: EntityManager,
    referenceId: Id
  ): Promise<IFileReference[]> {
    const repository = entityManager.getRepository(FileEntity);
    const entities = await repository.find({
      select: ["id", "created", "updated", "reference", "name", "extension"],
      where: {
        reference: referenceId
      },
      order: {
        name: "ASC",
        updated: "ASC"
      }
    });

    return entities.map(this.mapEntityToReference);
  }

  @LogFunction()
  public async getFile(
    entityManager: EntityManager,
    fileId: Id
  ): Promise<IFile> {
    const repository = entityManager.getRepository(FileEntity);
    const File = await repository.findOneOrFail({
      where: {
        id: fileId
      }
    });

    return this.mapEntityToModel(File);
  }

  @LogFunction()
  public async add(
    entityManager: EntityManager,
    file: IFileBase
  ): Promise<IFileReference> {
    const repository = entityManager.getRepository(FileEntity);

    const entity = repository.create();
    entity.reference = file.reference;
    entity.name = file.name;
    entity.extension = file.extension;
    entity.data = file.data;

    const saved = await repository.save(entity);

    return this.mapEntityToReference(saved);
  }

  public async update(
    entityManager: EntityManager,
    fileId: Id,
    data: string
  ): Promise<IFileReference> {
    const repository = entityManager.getRepository(FileEntity);

    const entity = await repository.findOneOrFail(fileId);
    entity.data = data;

    const saved = await repository.save(entity);

    return this.mapEntityToReference(saved);
  }

  public async delete(entityManager: EntityManager, fileId: Id): Promise<void> {
    const repository = entityManager.getRepository(FileEntity);
    await repository.delete({
      id: fileId
    });
  }

  public async deleteFilesForReference(
    entityManager: EntityManager,
    referenceId: Id
  ): Promise<void> {
    const repository = entityManager.getRepository(FileEntity);
    await repository.delete({
      reference: referenceId
    });
  }

  private mapEntityToReference(entity: FileEntity): IFileReference {
    return {
      id: entity.id,
      created: entity.created,
      updated: entity.updated,
      name: entity.name,
      extension: entity.extension,
      reference: entity.reference
    };
  }

  private mapEntityToModel(entity: FileEntity): IFile {
    return {
      id: entity.id,
      created: entity.created,
      updated: entity.updated,
      name: entity.name,
      extension: entity.extension,
      reference: entity.reference,
      data: entity.data
    };
  }
}
