import { injectable } from "inversify";
import { EntityManager } from "typeorm";
import { Id } from "./Id";
import { DiseaseEntity } from "./orm";
import { IDisease } from "./models";
import { LogFunction } from "app/logger";

@injectable()
export class DiseaseService {
  @LogFunction()
  public async getDisease(
    entityManager: EntityManager,
    id: Id
  ): Promise<IDisease> {
    const repository = entityManager.getRepository(DiseaseEntity);
    const disease = await repository.findOneOrFail(id);

    return this.mapEntityToModel(disease);
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
