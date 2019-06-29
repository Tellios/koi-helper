import { Entity, Column, ManyToOne } from "typeorm";
import { FishEntity } from "./FishEntity";
import { AppBaseEntity } from "./AppBaseEntity";

@Entity()
export class MeasurementEntity extends AppBaseEntity {
  @ManyToOne(() => FishEntity, fish => fish.measurements)
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
