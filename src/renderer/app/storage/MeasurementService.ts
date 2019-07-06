import { injectable } from "inversify";
import { EntityManager } from "typeorm";
import { Id } from "./Id";
import { IMeasurement, IMeasurementBase } from "./models";
import { MeasurementEntity, FishEntity } from "./orm";
import { LogFunction } from "app/logger";

@injectable()
export class MeasurementService {
  @LogFunction()
  public async getMeasurements(
    entityManager: EntityManager,
    fishId: Id
  ): Promise<IMeasurement[]> {
    const repository = entityManager.getRepository(MeasurementEntity);
    const entities = await repository.find({ where: { fish: fishId } });

    return entities.map(this.mapEntityToModel);
  }

  @LogFunction()
  public async add(
    entityManager: EntityManager,
    measurement: IMeasurementBase,
    fish: Id
  ): Promise<IMeasurement> {
    const repository = entityManager.getRepository(MeasurementEntity);
    const fishRepository = entityManager.getRepository(FishEntity);

    const newMeasurement = repository.create();
    newMeasurement.fish = await fishRepository.findOneOrFail(fish);
    newMeasurement.date = measurement.date;
    newMeasurement.comment = measurement.comment;
    newMeasurement.length = measurement.length;
    newMeasurement.weight = measurement.weight;

    const saved = await repository.save(newMeasurement);

    return this.mapEntityToModel(saved);
  }

  @LogFunction()
  public async update(
    entityManager: EntityManager,
    measurement: IMeasurement
  ): Promise<IMeasurement> {
    const repository = entityManager.getRepository(MeasurementEntity);

    const entity = await repository.findOneOrFail(measurement.id);
    entity.date = measurement.date;
    entity.length = measurement.length;
    entity.weight = measurement.weight;
    entity.comment = measurement.comment;

    const saved = await repository.save(entity);

    return this.mapEntityToModel(saved);
  }

  @LogFunction()
  public async delete(
    entityManager: EntityManager,
    measurementId: Id
  ): Promise<void> {
    const repository = entityManager.getRepository(MeasurementEntity);
    await repository.delete(measurementId);
  }

  private mapEntityToModel(entity: MeasurementEntity): IMeasurement {
    return {
      id: entity.id,
      created: entity.created,
      updated: entity.updated,
      date: entity.date,
      length: entity.length,
      weight: entity.weight,
      comment: entity.comment
    };
  }
}
