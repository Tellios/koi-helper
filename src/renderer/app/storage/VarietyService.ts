import { injectable } from "inversify";
import { LogFunction } from "app/logger";
import { EntityManager } from "typeorm";
import { IVarietyBase, IVariety } from "./models";
import { VarietyEntity, FishEntity } from "./orm";
import { Id } from "./Id";
import { t } from "app/i18n";
import { ReferencedByEntityError } from "./errors";

@injectable()
export class VarietyService {
  @LogFunction()
  public async getAll(entityManager: EntityManager): Promise<IVariety[]> {
    const repository = entityManager.getRepository(VarietyEntity);
    const entities = await repository.find();

    return entities.map(this.mapEntityToModel);
  }

  @LogFunction()
  public async add(
    entityManager: EntityManager,
    variety: IVarietyBase
  ): Promise<IVariety> {
    const repository = entityManager.getRepository(VarietyEntity);

    const entity = repository.create();
    entity.name = variety.name;
    entity.description = variety.description;

    const saved = await repository.save(entity);

    return this.mapEntityToModel(saved);
  }

  @LogFunction()
  public async update(
    entityManager: EntityManager,
    variety: IVariety
  ): Promise<IVariety> {
    const repository = entityManager.getRepository(VarietyEntity);

    const entity = await repository.findOneOrFail(variety.id);
    entity.name = variety.name;
    entity.description = variety.description;

    const saved = await repository.save(entity);

    return this.mapEntityToModel(saved);
  }

  @LogFunction()
  public async delete(
    entityManager: EntityManager,
    varietyId: Id
  ): Promise<void> {
    const repository = entityManager.getRepository(VarietyEntity);
    const fishRepository = entityManager.getRepository(FishEntity);

    const fishesWithVariety = await fishRepository
      .createQueryBuilder()
      .where("varietyId = :varietyId", { varietyId })
      .getCount();

    if (fishesWithVariety > 0) {
      throw new ReferencedByEntityError(t.variety.delete.errorReferencedByFish);
    }

    await repository.delete(varietyId);
  }

  private mapEntityToModel(entity: VarietyEntity): IVariety {
    return {
      id: entity.id,
      created: entity.created,
      updated: entity.updated,
      name: entity.name,
      description: entity.description
    };
  }
}
