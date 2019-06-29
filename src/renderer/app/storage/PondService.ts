import { injectable } from "inversify";
import { EntityManager } from "typeorm";
import { IPondBase, IPond, ITreatment } from "./models";
import { PondEntity } from "./orm";
import { TreatmentService } from "./TreatmentService";

@injectable()
export class PondService {
  public constructor(private treatmentService: TreatmentService) {}

  public async getPonds(entityManager: EntityManager): Promise<IPond[]> {
    const repository = entityManager.getRepository(PondEntity);
    const entities = await repository.find();

    return await Promise.all(
      entities.map(async entity =>
        this.mapEntityToModel(
          entity,
          await this.treatmentService.getTreatments(entityManager, entity.id)
        )
      )
    );
  }

  public async addPond(
    entityManager: EntityManager,
    newPond: IPondBase
  ): Promise<IPond> {
    const repository = entityManager.getRepository(PondEntity);
    const newEntity = repository.create({
      name: newPond.name,
      length: newPond.length,
      width: newPond.width,
      depth: newPond.depth,
      volume: newPond.volume,
      archived: false
    });

    return this.mapEntityToModel(await repository.save(newEntity), []);
  }

  public async updatePond(
    entityManager: EntityManager,
    pond: IPond
  ): Promise<IPond> {
    const repository = entityManager.getRepository(PondEntity);
    const existingPond = await repository.findOneOrFail(pond.id);

    existingPond.name = pond.name;
    existingPond.length = pond.length;
    existingPond.width = pond.width;
    existingPond.depth = pond.depth;
    existingPond.volume = pond.volume;
    existingPond.archived = pond.archived;

    return this.mapEntityToModel(
      await repository.save(existingPond),
      await this.treatmentService.getTreatments(entityManager, existingPond.id)
    );
  }

  private mapEntityToModel(
    entity: PondEntity,
    treatments: ITreatment[]
  ): IPond {
    return {
      id: entity.id,
      created: entity.created,
      updated: entity.updated,
      name: entity.name,
      length: entity.length,
      width: entity.width,
      depth: entity.depth,
      volume: entity.depth,
      archived: entity.archived,
      treatments
    };
  }
}
