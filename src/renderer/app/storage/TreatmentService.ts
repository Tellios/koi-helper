import { injectable } from "inversify";
import {
  ITreatmentBase,
  ITreatment,
  ITreatmentCommentBase,
  ITreatmentComment
} from "./models";
import { EntityManager } from "typeorm";
import { TreatmentEntity, TreatmentCommentEntity, DiseaseEntity } from "./orm";
import { Id } from "./Id";
import { LogFunction } from "app/logger";

@injectable()
export class TreatmentService {
  @LogFunction()
  public async getTreatments(
    entityManager: EntityManager,
    pondId: Id
  ): Promise<ITreatment[]> {
    const repository = entityManager.getRepository(TreatmentEntity);
    const treatments = await repository.find({ where: { reference: pondId } });

    return await Promise.all(
      treatments.map(async t =>
        this.mapTreatmentToModel(t, await this.getComments(entityManager, t.id))
      )
    );
  }

  @LogFunction()
  public async add(
    entityManager: EntityManager,
    treatment: ITreatmentBase,
    disease: Id
  ): Promise<ITreatment> {
    const repository = entityManager.getRepository(TreatmentEntity);
    const diseaseRepository = entityManager.getRepository(DiseaseEntity);

    const newTreatment = repository.create();
    newTreatment.reference = treatment.reference;
    newTreatment.finished = treatment.finished;
    newTreatment.ended = treatment.ended;
    newTreatment.comments = [];
    newTreatment.disease = await diseaseRepository.findOneOrFail(disease);

    const saved = await repository.save(newTreatment);

    return this.mapTreatmentToModel(
      saved,
      await this.getComments(entityManager, saved.id)
    );
  }

  @LogFunction()
  public async update(
    entityManager: EntityManager,
    treatment: ITreatment
  ): Promise<ITreatment> {
    const repository = entityManager.getRepository(TreatmentEntity);
    const diseaseRepository = entityManager.getRepository(DiseaseEntity);

    const entity = await repository.findOneOrFail(treatment.id);
    entity.reference = treatment.reference;
    entity.finished = treatment.finished;
    entity.ended = treatment.ended;
    entity.disease = await diseaseRepository.findOneOrFail(treatment.diseaseId);

    const saved = await repository.save(entity);

    return this.mapTreatmentToModel(
      saved,
      await this.getComments(entityManager, saved.id)
    );
  }

  @LogFunction()
  public async getComments(
    entityManager: EntityManager,
    treatmentId: Id
  ): Promise<ITreatmentComment[]> {
    const repository = entityManager.getRepository(TreatmentEntity);
    const treatment = await repository.findOneOrFail(treatmentId);

    return treatment.comments.map(this.mapCommentEntityToModel);
  }

  @LogFunction()
  public async addComment(
    entityManager: EntityManager,
    comment: ITreatmentCommentBase
  ): Promise<ITreatmentCommentBase> {
    const repository = entityManager.getRepository(TreatmentCommentEntity);

    const newComment = repository.create();
    newComment.comment = comment.comment;
    newComment.category = comment.category;

    const saved = await repository.save(newComment);

    return this.mapCommentEntityToModel(saved);
  }

  private mapTreatmentToModel(
    entity: TreatmentEntity,
    comments: ITreatmentComment[]
  ): ITreatment {
    return {
      id: entity.id,
      created: entity.created,
      updated: entity.updated,
      ended: entity.ended,
      diseaseId: entity.disease.id,
      finished: entity.finished,
      reference: entity.reference,
      comments
    };
  }

  private mapCommentEntityToModel(
    entity: TreatmentCommentEntity
  ): ITreatmentComment {
    return {
      id: entity.id,
      created: entity.created,
      updated: entity.updated,
      category: entity.category,
      comment: entity.comment
    };
  }
}
