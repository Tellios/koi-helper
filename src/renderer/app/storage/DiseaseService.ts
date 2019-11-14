import { injectable } from "inversify";
import { EntityManager } from "typeorm";
import { Id } from "./Id";
import { DiseaseEntity, TreatmentEntity } from "./orm";
import { IDisease, IDiseaseBase } from "./models";
import { LogFunction } from "app/logger";
import { ReferencedByEntityError } from "./errors";
import { t } from "app/i18n";
import { ImageService } from "./ImageService";

@injectable()
export class DiseaseService {
  public constructor(private imageService: ImageService) {}

  @LogFunction()
  public async getAll(entityManager: EntityManager): Promise<IDisease[]> {
    const repository = entityManager.getRepository(DiseaseEntity);
    const entities = await repository.find();

    return entities.map(this.mapEntityToModel);
  }

  @LogFunction()
  public async getDisease(
    entityManager: EntityManager,
    id: Id
  ): Promise<IDisease> {
    const repository = entityManager.getRepository(DiseaseEntity);
    const disease = await repository.findOneOrFail(id);

    return this.mapEntityToModel(disease);
  }

  @LogFunction()
  public async add(
    entityManager: EntityManager,
    disease: IDiseaseBase
  ): Promise<IDisease> {
    const repository = entityManager.getRepository(DiseaseEntity);

    const entity = repository.create();
    entity.name = disease.name;
    entity.description = disease.description;
    entity.medication = disease.medication;

    const saved = await repository.save(entity);

    return this.mapEntityToModel(saved);
  }

  @LogFunction()
  public async update(
    entityManager: EntityManager,
    disease: IDisease
  ): Promise<IDisease> {
    const repository = entityManager.getRepository(DiseaseEntity);

    const entity = await repository.findOneOrFail(disease.id);
    entity.name = disease.name;
    entity.description = disease.description;
    entity.medication = disease.medication;

    const saved = await repository.save(entity);

    return this.mapEntityToModel(saved);
  }

  public async delete(
    entityManager: EntityManager,
    diseaseId: Id
  ): Promise<void> {
    await this.imageService.deleteImagesForReference(entityManager, diseaseId);

    const repository = entityManager.getRepository(DiseaseEntity);
    const treatmentRepository = entityManager.getRepository(TreatmentEntity);

    const treatmentsWithDisease = await treatmentRepository
      .createQueryBuilder()
      .where("diseaseId = :diseaseId", { diseaseId })
      .getCount();

    if (treatmentsWithDisease > 0) {
      throw new ReferencedByEntityError(
        t.disease.delete.errorReferencedByDisease
      );
    }

    await repository.delete(diseaseId);
  }

  private mapEntityToModel(entity: DiseaseEntity): IDisease {
    return {
      id: entity.id,
      created: entity.created,
      updated: entity.updated,
      name: entity.name,
      description: entity.description,
      medication: entity.medication
    };
  }
}
