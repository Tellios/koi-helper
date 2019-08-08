import { injectable } from "inversify";
import { EntityManager } from "typeorm";
import { IPondBase, IPond, ITreatment } from "./models";
import { PondEntity } from "./orm";
import { TreatmentService } from "./TreatmentService";
import { LogFunction } from "app/logger";
import { Id } from "./Id";

@injectable()
export class PondService {
  public constructor(private treatmentService: TreatmentService) {}

  @LogFunction()
  public async getPond(
    entityManager: EntityManager,
    pondId: Id
  ): Promise<IPond> {
    const repository = entityManager.getRepository(PondEntity);
    const entity = await repository.findOneOrFail(pondId);

    return this.mapEntityToModel(
      entity,
      await this.treatmentService.getTreatments(entityManager, entity.id)
    );
  }

  @LogFunction()
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

  @LogFunction()
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

  @LogFunction()
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
      volume: entity.volume,
      archived: entity.archived,
      treatments
    };
  }
}
