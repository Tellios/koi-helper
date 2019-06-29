import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { Sex } from "../../Sex";
import { VarietyEntity } from "./VarietyEntity";
import { PondEntity } from "./PondEntity";
import { MeasurementEntity } from "./MeasurementEntity";
import { AppBaseEntity } from "./AppBaseEntity";

@Entity()
export class FishEntity extends AppBaseEntity {
  @Column("date")
  born: Date = new Date();

  @Column("text")
  sex: Sex = "female";

  @Column("text")
  country: string = "";

  @Column("text")
  value: string = "";

  @Column("text")
  breeder: string = "";

  @Column("text")
  name: string = "";

  @ManyToOne(() => PondEntity, pond => pond.fishes)
  pond!: PondEntity;

  @OneToOne(() => VarietyEntity)
  @JoinColumn()
  variety?: VarietyEntity;

  @OneToMany(() => MeasurementEntity, measurement => measurement.fish)
  measurements: MeasurementEntity[] = [];
}
