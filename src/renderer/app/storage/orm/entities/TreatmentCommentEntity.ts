import { Entity, Column, ManyToOne } from "typeorm";
import { TreatmentEntity } from "./TreatmentEntity";
import { AppBaseEntity } from "./AppBaseEntity";

@Entity()
export class TreatmentCommentEntity extends AppBaseEntity {
  @ManyToOne(() => TreatmentEntity, treatment => treatment.comments)
  pondTreatment!: TreatmentEntity;

  @Column("text")
  comment: string = "";

  @Column("text")
  category: string = "";
}
