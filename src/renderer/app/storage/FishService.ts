import { injectable } from "inversify";
import { LogFunction } from "app/logger";
import { EntityManager } from "typeorm";
import { IFishBase, IFish, IMeasurement, ITreatment } from "./models";
import { FishEntity, PondEntity, VarietyEntity } from "./orm";
import { TreatmentService } from "./TreatmentService";
import { MeasurementService } from "./MeasurementService";
import { Id } from "./Id";

@injectable()
export class FishService {
  public constructor(
    private treatmentService: TreatmentService,
    private measurementService: MeasurementService
  ) {}

  @LogFunction()
  public async add(
    entityManager: EntityManager,
    fish: IFishBase,
    pondId: Id
  ): Promise<IFish> {
    const repository = entityManager.getRepository(FishEntity);
    const pondRepository = entityManager.getRepository(PondEntity);
    const varietyRepository = entityManager.getRepository(VarietyEntity);

    const entity = repository.create();
    entity.born = fish.born;
    entity.breeder = fish.breeder;
    entity.country = fish.country;
    entity.name = fish.name;
    entity.pond = await pondRepository.findOneOrFail(pondId);
    entity.sex = fish.sex;
    entity.value = fish.value;
    entity.variety = await varietyRepository.findOneOrFail(fish.variety);

    const saved = await repository.save(entity);

    return this.mapEntityToModel(saved, [], []);
  }

  @LogFunction()
  public async update(
    entityManager: EntityManager,
    fish: IFish
  ): Promise<IFish> {
    const repository = entityManager.getRepository(FishEntity);
    const varietyRepository = entityManager.getRepository(VarietyEntity);

    const entity = await repository.findOneOrFail(fish.id);
    entity.born = fish.born;
    entity.breeder = fish.breeder;
    entity.country = fish.country;
    entity.name = fish.name;
    entity.sex = fish.sex;
    entity.value = fish.value;
    entity.variety = await varietyRepository.findOneOrFail(fish.variety);

    const saved = await repository.save(entity);

    return this.mapEntityToModel(
      saved,
      await this.measurementService.getMeasurements(entityManager, fish.id),
      await this.treatmentService.getTreatments(entityManager, fish.id)
    );
  }

  @LogFunction()
  public async delete(
    entityManager: EntityManager,
    fish: IFish
  ): Promise<void> {
    const measurements = await this.measurementService.getMeasurements(entityManager, fish.id);
    const treatments = await this.treatmentService.getTreatments(entityManager, fish.id);

    for (const measurement of measurements) {
        await this.measurementService.delete(entityManager, measurement.id);
    }

    for (const treatment of treatments) {
        await this.treatmentService.delete(entityManager, treatment.id);
    }

    const repository = entityManager.getRepository(FishEntity);
    await repository.delete(fish.id);
  }

  private mapEntityToModel(
    entity: FishEntity,
    measurements: IMeasurement[],
    treatments: ITreatment[]
  ): IFish {
    return {
      id: entity.id,
      born: entity.born,
      breeder: entity.breeder,
      country: entity.country,
      created: entity.created,
      updated: entity.updated,
      name: entity.name,
      pond: entity.pond.id,
      sex: entity.sex,
      value: entity.value,
      variety: entity.variety.id,
      measurements,
      treatments
    };
  }
}
