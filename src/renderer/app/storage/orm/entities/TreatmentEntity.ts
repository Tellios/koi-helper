import { Entity, Column, OneToOne, OneToMany, JoinColumn } from "typeorm";
import { Id } from "app/storage";
import { DiseaseEntity } from "./DiseaseEntity";
import { TreatmentCommentEntity } from "./TreatmentCommentEntity";
import { AppBaseEntity } from "./AppBaseEntity";

@Entity()
export class TreatmentEntity extends AppBaseEntity {
  @Column("uuid")
  reference!: Id;

  @OneToOne(() => DiseaseEntity)
  @JoinColumn()
  disease!: DiseaseEntity;

  @OneToMany(() => TreatmentCommentEntity, comment => comment.pondTreatment)
  comments: TreatmentCommentEntity[] = [];

  @Column("date")
  ended: Date = new Date();

  @Column("bool")
  finished: boolean = false;
}
