import { injectable } from "inversify";
import { EntityManager } from "typeorm";
import { Id } from "./Id";
import { ImageEntity } from "./orm";
import { IImage, IImageReference, IImageBase } from "./models";
import { LogFunction } from "app/logger";
import { v4 } from "uuid";

@injectable()
export class ImageService {
  @LogFunction()
  public async getImageReferences(
    entityManager: EntityManager,
    referenceId: Id
  ): Promise<IImageReference[]> {
    const repository = entityManager.getRepository(ImageEntity);
    const entities = await repository.find({
      select: ["id", "isThumbnail", "created", "updated", "name", "reference"],
      where: {
        reference: referenceId,
        isThumbnail: true
      }
    });

    return entities.map(this.mapEntityToReference);
  }

  @LogFunction()
  public async getImage(
    entityManager: EntityManager,
    id: Id,
    isThumbnail: boolean
  ): Promise<IImage> {
    const repository = entityManager.getRepository(ImageEntity);
    const image = await repository.findOneOrFail({
      where: {
        id,
        isThumbnail
      }
    });

    return this.mapEntityToModel(image);
  }

  @LogFunction()
  public async add(
    entityManager: EntityManager,
    image: IImageBase,
    thumbnail: IImageBase
  ): Promise<IImageReference> {
    const repository = entityManager.getRepository(ImageEntity);

    const entity = repository.create();
    entity.id = v4();
    entity.isThumbnail = false;
    entity.name = image.name;
    entity.reference = image.reference;
    entity.data = image.data;

    const entityThumbnail = repository.create();
    entityThumbnail.id = entity.id;
    entityThumbnail.isThumbnail = true;
    entityThumbnail.name = thumbnail.name;
    entityThumbnail.reference = thumbnail.reference;
    entityThumbnail.data = thumbnail.data;

    const saved = await repository.save([entity, entityThumbnail]);

    return this.mapEntityToReference(saved[1]);
  }

  public async delete(
    entityManager: EntityManager,
    imageId: Id
  ): Promise<void> {
    const repository = entityManager.getRepository(ImageEntity);
    await repository.delete({
      id: imageId
    });
  }

  public async deleteImagesForReference(
    entityManager: EntityManager,
    referenceId: Id
  ): Promise<void> {
    const repository = entityManager.getRepository(ImageEntity);
    await repository.delete({
      reference: referenceId
    });
  }

  private mapEntityToReference(entity: ImageEntity): IImageReference {
    return {
      id: entity.id,
      isThumbnail: entity.isThumbnail,
      created: entity.created,
      updated: entity.updated,
      name: entity.name,
      reference: entity.reference
    };
  }

  private mapEntityToModel(entity: ImageEntity): IImage {
    return {
      id: entity.id,
      isThumbnail: entity.isThumbnail,
      created: entity.created,
      updated: entity.updated,
      name: entity.name,
      reference: entity.reference,
      data: entity.data
    };
  }
}
