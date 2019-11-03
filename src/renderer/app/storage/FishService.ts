import { injectable } from "inversify";
import { LogFunction } from "app/logger";
import { EntityManager } from "typeorm";
import { IFishBase, IFish, IMeasurement, ITreatment } from "./models";
import { FishEntity, PondEntity } from "./orm";
import { TreatmentService } from "./TreatmentService";
import { MeasurementService } from "./MeasurementService";
import { Id } from "./Id";
import { ImageService } from "./ImageService";

@injectable()
export class FishService {
  public constructor(
    private treatmentService: TreatmentService,
    private measurementService: MeasurementService,
    private imageService: ImageService
  ) {}

  @LogFunction()
  public async getPondFishes(
    entityManager: EntityManager,
    pondId: Id
  ): Promise<IFish[]> {
    const pondRepository = entityManager.getRepository(PondEntity);
    const pondEntity = await pondRepository.findOneOrFail(pondId);

    const fishes = await pondEntity.fishes;

    return await Promise.all(
      fishes.map(async entity => {
        return this.mapEntityToModel(
          entity,
          pondId,
          await this.measurementService.getMeasurements(
            entityManager,
            entity.id
          ),
          await this.treatmentService.getTreatments(entityManager, entity.id)
        );
      })
    );
  }

  @LogFunction()
  public async add(
    entityManager: EntityManager,
    fish: IFishBase,
    pondId: Id
  ): Promise<IFish> {
    const repository = entityManager.getRepository(FishEntity);
    const pondRepository = entityManager.getRepository(PondEntity);

    const entity = repository.create();
    entity.born = fish.born;
    entity.breeder = fish.breeder;
    entity.origin = fish.origin;
    entity.name = fish.name;
    entity.sex = fish.sex;
    entity.value = fish.value;
    entity.varietyId = fish.variety;
    entity.pond = await pondRepository.findOneOrFail(pondId);

    const saved = await repository.save(entity);

    return await this.mapEntityToModel(saved, pondId, [], []);
  }

  @LogFunction()
  public async update(
    entityManager: EntityManager,
    fish: IFish
  ): Promise<IFish> {
    const repository = entityManager.getRepository(FishEntity);

    const entity = await repository.findOneOrFail(fish.id);
    entity.born = fish.born;
    entity.breeder = fish.breeder;
    entity.origin = fish.origin;
    entity.name = fish.name;
    entity.sex = fish.sex;
    entity.value = fish.value;
    entity.varietyId = fish.variety;

    const saved = await repository.save(entity);

    return await this.mapEntityToModel(
      saved,
      fish.pond,
      await this.measurementService.getMeasurements(entityManager, fish.id),
      await this.treatmentService.getTreatments(entityManager, fish.id)
    );
  }

  @LogFunction()
  public async delete(
    entityManager: EntityManager,
    fish: IFish
  ): Promise<void> {
    const measurements = await this.measurementService.getMeasurements(
      entityManager,
      fish.id
    );
    const treatments = await this.treatmentService.getTreatments(
      entityManager,
      fish.id
    );

    for (const measurement of measurements) {
      await this.measurementService.delete(entityManager, measurement.id);
    }

    for (const treatment of treatments) {
      await this.treatmentService.delete(entityManager, treatment.id);
    }

    await this.imageService.deleteImagesForReference(entityManager, fish.id);

    const repository = entityManager.getRepository(FishEntity);
    await repository.delete(fish.id);
  }

  private mapEntityToModel(
    entity: FishEntity,
    pondId: Id,
    measurements: IMeasurement[],
    treatments: ITreatment[]
  ): IFish {
    return {
      id: entity.id,
      born: entity.born,
      breeder: entity.breeder,
      origin: entity.origin,
      created: entity.created,
      updated: entity.updated,
      name: entity.name,
      pond: pondId,
      sex: entity.sex,
      value: entity.value,
      variety: entity.varietyId,
      measurements,
      treatments
    };
  }
}
