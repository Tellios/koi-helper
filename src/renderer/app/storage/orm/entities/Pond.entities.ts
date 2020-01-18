import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn
} from "typeorm";
import { AppBaseEntity } from "./AppBaseEntity";
import { Id } from "../../Id";
import { Sex } from "../../Sex";

@Entity()
export class DiseaseEntity extends AppBaseEntity {
  @Column("text")
  name: string = "";

  @Column("text")
  description: string = "";

  @Column("text")
  medication: string = "";
}

@Entity()
export class VarietyEntity extends AppBaseEntity {
  @Column("text")
  name: string = "";

  @Column("text")
  description: string = "";
}

@Entity()
export class PondEntity extends AppBaseEntity {
  @Column("text")
  name: string = "";

  @Column("double")
  length: number = 0;

  @Column("double")
  width: number = 0;

  @Column("double")
  depth: number = 0;

  @Column("double")
  volume: number = 0;

  @Column("boolean")
  archived: boolean = false;

  @OneToMany(
    () => FishEntity,
    fish => fish.pond
  )
  @JoinTable()
  fishes!: Promise<FishEntity[]>;
}

@Entity()
export class TreatmentEntity extends AppBaseEntity {
  @Column("uuid")
  reference!: Id;

  @OneToOne(() => DiseaseEntity)
  @JoinColumn()
  disease!: DiseaseEntity;

  @OneToMany(
    () => TreatmentCommentEntity,
    comment => comment.treatment
  )
  comments!: TreatmentCommentEntity[];

  @Column("date")
  ended: Date = new Date();

  @Column("boolean")
  finished: boolean = false;
}

@Entity()
export class TreatmentCommentEntity extends AppBaseEntity {
  @ManyToOne(
    () => TreatmentEntity,
    treatment => treatment.comments
  )
  treatment!: TreatmentEntity;

  @Column("text")
  comment: string = "";

  @Column("text")
  category: string = "";
}

@Entity()
export class ImageEntity {
  @PrimaryColumn("text")
  id!: Id;

  @PrimaryColumn("boolean")
  isThumbnail!: boolean;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @Column("text")
  reference!: Id;

  @Column("text")
  name!: string;

  @Column("text")
  data!: string;
}

@Entity()
export class FishEntity extends AppBaseEntity {
  @Column("date")
  born: Date = new Date();

  @Column("text")
  sex: Sex = "female";

  @Column("text")
  origin: string = "";

  @Column("real")
  value: number = 0;

  @Column("text")
  breeder: string = "";

  @Column("text")
  name: string = "";

  @ManyToOne(
    () => PondEntity,
    pond => pond.fishes
  )
  pond!: PondEntity;

  @Column("text")
  varietyId: string = "";

  @OneToMany(
    () => MeasurementEntity,
    measurement => measurement.fish
  )
  measurements!: MeasurementEntity[];
}

@Entity()
export class MeasurementEntity extends AppBaseEntity {
  @ManyToOne(
    () => FishEntity,
    fish => fish.measurements
  )
  fish!: FishEntity;

  @Column("date")
  date: Date = new Date();

  @Column("double")
  length: number = 0;

  @Column("double")
  weight: number = 0;

  @Column("text")
  comment: string = "";
}

@Entity()
export class FileEntity extends AppBaseEntity {
  @Column("text")
  reference!: Id;

  @Column("text")
  name!: string;

  @Column("text")
  extension!: string;

  @Column("text")
  data!: string;
}
